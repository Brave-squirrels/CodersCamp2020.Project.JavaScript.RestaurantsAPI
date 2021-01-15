const fetch = require('node-fetch');
const saveInfo = require('./cookies');

/**
 * @declare class Restaurant with basic informations about it inside
 */

class Restaurant {
    constructor(id, name, logo, cuisines, priceRaiting, address, phone, rating, reviews, city) {
        this.id = id,
            this.name = name,
            this.logo = logo,
            this.cuisines = cuisines,
            this.priceRaiting = priceRaiting,
            this.address = address,
            this.phone = phone,
            this.rating = rating,
            this.reviews = reviews,
            this.city = city
    }
}



/**
 * @return array of cookies as single objects
 */

const arrayOfCookies = () => {
    let cookiesArray = [];
    let cookies = document.cookie;
    let index = cookies.indexOf('=');
    cookies = cookies.split('; ');
    cookies.forEach(cookie => {
        cookie = cookie.slice(index + 1);
        cookiesArray.push(JSON.parse(cookie));
        cookie = JSON.parse(cookie);
    })
    return cookiesArray;
}



/**
 * @delete all of the cookies from cookies
 */

const deleteAllCookies = () => {
    let cookies = document.cookie.split("; ");
    cookies.forEach(cookie => {
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    })
}

/**
 * 
 * @param {string} cityName - name of the city from users input
 * 
 * @check if restaurants from current city are saved in cookies
 * @check if there are no cookies, check if no more than 2 different cities are save in cookies, if yes, delete both (error 431)
 */

const checkCookies = (cityName) => {
    if (document.cookie.includes(cityName)) {
        return true;
    } else if (document.cookie.includes('=')) {
        let cityNames = [];
        let cookies = arrayOfCookies();
        cookies.forEach(cookie => {
            if (cityNames[0] !== cookie.city) {
                cityNames.push(cookie.city)
            }
            if (cityNames.length === 2) {
                deleteAllCookies();
                return;
            }
        })
    }
}



/**
 * 
 * @param {string} cityName - name of the city
 * @param {array} restaurants - array of restaurants
 * 
 * @fetch data about restaurants from cookies
 * @return array of restaurants filled with data of restaurants from current city
 */

const getCookies = (cityName, restaurants = []) => {
    let cookies = arrayOfCookies();
    cookies.forEach(cookie => {
        if (cookie.city === cityName) {
            restaurants.push(cookie);
            return;
        }
    })
    return restaurants;
}



/**
 * 
 * @param {string} url - a url addres to api 
 * 
 * @fetch JSON from api url
 * 
 * @return JSON of fetched data 
 */

const fetchData = async(url) => {
    let response = await fetch(url, {
            headers: {
                'Content-type': 'application/json',
                'user-key': '63106852ba4b223bc312eb4f6606cbe3'
            }
        })
        .then(res => res.json());
    return response;
}



/**
 * 
 * @param {string} url - addres url to api
 * 
 * @fetch cityname based on user input (might also find weird cities from all over the world)
 * @check if city was found, or sadly the api do not include it
 * 
 * @return cityname found in api
 */

const fetchCity = async(url) => {
    let res = await fetchData(url);
    if (res.location_suggestions[0] == undefined) {
        let cityId = undefined
        return cityId
    } else {
        let cityId = res.location_suggestions[0].city_id;
        return cityId
    }
}



/**
 * 
 * @param {string} url
 * 
 * @fetch info about restaurants in current city
 * 
 * @return array of restaurants with basic info
 */

const fetchRestaurants = async(url) => {
    const addRestaurant = (item) => {
        const restaurant = new Restaurant(
            item.restaurant.id,
            item.restaurant.name,
            item.restaurant.featured_image,
            item.restaurant.cuisines,
            item.restaurant.price_range,
            item.restaurant.location.address,
            item.restaurant.phone_numbers,
            item.restaurant.user_rating.aggregate_rating, [],
            replacePolishChar(item.restaurant.location.city)
        );
        restaurantsFromCity.push(restaurant);
    }

    let result = await fetchData(url);
    let restaurantsFromCity = []

    for (const item of result.restaurants) {
        addRestaurant(item);
    }

    return restaurantsFromCity;
}



/**
 * 
 * @param {string} getCityName - current input from user (perhaps a city name)
 * 
 * @replace polish and uppercase letters to 'normal' lowercase
 * 
 * @retun replaced string
 */

const replacePolishChar = (getCityName) => {
    let cityName = getCityName.replace(/ą/gi, 'a')
        .replace(/ć/gi, 'c')
        .replace(/ę/gi, 'e')
        .replace(/ł/gi, 'l')
        .replace(/ń/gi, 'n')
        .replace(/ó/gi, 'o')
        .replace(/ś/gi, 's')
        .replace(/ż/gi, 'z')
        .replace(/ź/gi, 'z')

    cityName = cityName.toLowerCase();
    return cityName
}



/**
 * 
 * @param {string} getCityNames - input from user (perhaps a city name)
 * 
 * @check check if input actually might be a cityname, not a number, or some different weird stuff
 * 
 * @retun true if it is propably correct city name, false otherwise 
 */

const validateTown = (getCityNames) => {
    const format = /[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]+/;
    return isNaN(getCityNames) && getCityNames.length !== 0 && !format.test(getCityNames);
}



/**
 * 
 * @param {string} getCityName - input from user (perhaps a cityname)
 * 
 * @check if string from input is actually a valid cityname
 * @check if its valid, check if restaurants from this city are saved in cookies
 * @check if yes return data from cookies
 * @check if no, make sure, the city we are looking for, exists in api
 * @fetch If it exists, fetch info about restaurants from api, if no, return error message
 * 
 * @retun return array with restaurats
 */

const mainFunc = async(getCityName) => {
    let cityName = await replacePolishChar(getCityName);
    let ValidateCity = await validateTown(cityName);

    if (!ValidateCity) return ['incorrect syntax'];

    let checkCookie = await checkCookies(cityName);
    if (checkCookie) {
        let restaurants = await getCookies(cityName);
        return restaurants;
    } else {
        let cityId = await fetchCity(`https://developers.zomato.com/api/v2.1/locations?query=${cityName}`);
        if (cityId === undefined) return ['city does not exist'];

        let restaurants = await fetchRestaurants(`https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city`);

        await saveInfo(restaurants);

        return restaurants;
    }
}



/**
 * 
 * @param {string} restaurantId - id from api about current restaurant
 * @param {array} restaurants - array of restaurants
 * 
 * @fetch data about reviews for current restaurant, from api
 * @add reviews to current restaurant (based on id)
 * 
 * @return restaurants array with current restaurant updated by reviews
 */

const fetchUserReviews = async(restaurantId, restaurants) => {
    let listOfReviews = [];
    let result = await fetchData(`https://developers.zomato.com/api/v2.1/reviews?res_id=${restaurantId}`);

    for (const item of result.user_reviews) {
        if (item.review.review_text != '') {
            listOfReviews.push({
                textReview: item.review.review_text,
                ratingReview: item.review.rating
            })
        }
    };

    restaurants.forEach(restaurant => {
        if (restaurant.id == restaurantId) {
            restaurant.reviews = [...listOfReviews];
            return;
        }
    })

    return restaurants;
}



/**
 * @export functions - exports functions for frontend purposes
 */

module.exports = {
    mainFunc,
    fetchUserReviews
}