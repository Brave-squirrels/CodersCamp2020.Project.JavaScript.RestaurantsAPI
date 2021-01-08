const fetch = require('node-fetch')
const { saveInfo } = require('./restaurants-api');

const fetchData = async(url) => {
    /*
        -parameter url
        @ return JSON object
        -Fetches data
    */

    let response = await fetch(url, {
            headers: {
                'Content-type': 'application/json',
                'user-key': '63106852ba4b223bc312eb4f6606cbe3'
            }
        })
        .then(res => res.json());
    return response;
}

const fetchCity = async(url) => {
    /*
        -parameters (url)
        @ return number (city id)
        - searches for city id based on city name
    */

    let res = await fetchData(url);
    if (res.location_suggestions[0] == undefined) {
        let cityId = undefined

        return cityId
    } else {
        let cityId = res.location_suggestions[0].city_id;
        return cityId
    }
}

const fetchRestaurants = async(url, cityName) => {
    /*
        -parameters url
        @ returns JSON objec
        - filtres restaurants in the city by user cusines / if userCuisines is empty, returns all restaurants:
            - cuisines type
        - creates a JSON array with objects(for each restaurant new object) with main informations about filtred restaurants:
            -name of restaurant
            -photo url
            -cuisines
            -price bracket of the restaurant(1-4)
            -address
            -phone number
            -reviews
            -average rating
            
    */


    const addRestaurant = (item) => {
        restaurantsFromCity.push({
            id: item.restaurant.id,
            name: item.restaurant.name,
            logo: item.restaurant.featured_image,
            cuisines: item.restaurant.cuisines,
            priceRaiting: item.restaurant.price_range,
            address: item.restaurant.location.address,
            phone: item.restaurant.phone_numbers,
            rating: item.restaurant.user_rating.aggregate_rating,
            city: cityName
        })
    }

    let result = await fetchData(url);
    let restaurantsFromCity = []

    for (const item of result.restaurants) {
        addRestaurant(item);
    }

    return restaurantsFromCity;
}


const replacePolishChar = (getCityName) => {
    /*
        -parametr (name of city)
        @return string
        -replace all Polish characters on chracter without diacritic
    */

    let cityName = getCityName.replace(/ą/gi, 'a')
        .replace(/ć/gi, 'c')
        .replace(/ę/gi, 'e')
        .replace(/ł/gi, 'l')
        .replace(/ń/gi, 'n')
        .replace(/ó/gi, 'o')
        .replace(/ś/gi, 's')
        .replace(/ż/gi, 'z')
        .replace(/ź/gi, 'z')

    return cityName
}



const validateTown = (getCityNames) => {
    const format = /[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]+/;
    return isNaN(getCityNames) && getCityNames.length !== 0 && !format.test(getCityNames);
}

const mainFunc = async(cityName) => {
    /*
        main function
        -parameters (string eg.'wroclaw')
    */

    let cityName = await replacePolishChar(cityName);

    let ValidateCity = await validateTown(cityName);

    if (!ValidateCity) return ['incorrect syntax']; /* @return ['incorrect syntax'] if incorrect city name*/

    let cityId = await fetchCity(`https://developers.zomato.com/api/v2.1/locations?query=${cityName}`);

    if (cityId === undefined) return ['city does not exist']; /* @return ['city does not exist'] if incorrect id*/

    let restaurants = await fetchRestaurants(`https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city`, cityName);

    return restaurants;
}

const fetchUserReviews = async(restaurantId, restaurants) => {
    /*
        - parameters (Id of restaurant)
        @ return array of objects users reviews about restaurant and grade to each comment
    */
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

    restaurants.forEach(resturant => {
        if (resturant.id == restaurantId) {
            listOfReviews.forEach(review => {
                restaurant.reviews.push(review);
            })
        }
    })

    saveInfo(restaurants, restaurants[0].city);

    return restaurants;
}

// Exports function for testing (later to frontend also)
module.exports = {
        mainFunc,
        fetchUserReviews
    }
    // module.exports = fetchUserReviews;