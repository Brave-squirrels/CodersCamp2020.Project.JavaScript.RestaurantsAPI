const fetch = require('node-fetch')


const fetchData = async(url) => {
    /*
        -parameter url
        @ return JSON object
        -Fetches data
    */

    let response = await fetch(url, {
            headers: {
                'Content-type': 'application/json',
                'user-key': 'a2312f9d231f29610389057aa0a28111'
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
    if (res.location_suggestions[0]==undefined) {
        let cityId = undefined

        return cityId
    } else {
    let cityId = res.location_suggestions[0].city_id;
    
    return cityId
    }
}

const fetchUserReviews = async(restaurantId) => {
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

    return listOfReviews;
}


const fetchDailyMenu = async(restaurantId) => {
    /*
        - parameters (Id of restaurant)
        @ return array of daily menu objects {dishName, dishPrice, startDate}
    */
    let dailyMenu = [];

    let result = await fetchData(`https://developers.zomato.com/api/v2.1/dailymenu?res_id=${restaurantId}`);


    if (result.status != 'success') {
        dailyMenu.push('No Daily Menu')
        return dailyMenu;
    } else {
        for (const item of result.daily_menus) {
            for (const obj of item.daily_menu.dishes) {
                dailyMenu.push({
                    dishName: obj.dish.name,
                    dishPrice: obj.dish.price,
                    startDate: item.daily_menu.start_date
                })
            }
        };

        return dailyMenu;
    }
}



const fetchRestaurants = async(url) => {
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
            -object of daily menu (dish name, dish price and day when daily menu is starting) 
            -address
            -phone number
            -reviews
            -average rating
            
    */


    const addRestaurant = async(item, listReviews, listDailyMenu) => {
        restaurantsFromCity.push({
            name: item.restaurant.name,
            logo: item.restaurant.featured_image,
            cuisines: item.restaurant.cuisines,
            priceRaiting: item.restaurant.price_range,
            dailyMenu: listDailyMenu,
            address: item.restaurant.location.address,
            phone: item.restaurant.phone_numbers,
            reviews: listReviews,
            rating: item.restaurant.user_rating.aggregate_rating
        })
    }

    let result = await fetchData(url);
    let restaurantsFromCity = []


    for (const item of result.restaurants) {
        let listDailyMenu = await fetchDailyMenu(item.restaurant.id);
        let listReviews = await fetchUserReviews(item.restaurant.id);
        addRestaurant(item, listReviews, listDailyMenu);

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


const mainFunc = async(getCityName) => {
    /*
        main function
        -parameters (string eg.'wroclaw')
    */

    // Returns empty array if no CityName was provided
    if (getCityName.length === 0) return [];

    let cityName = await replacePolishChar(getCityName);

    let cityId = await fetchCity(`https://developers.zomato.com/api/v2.1/locations?query=${cityName}`);
    
    if (cityId==undefined) {
        /*
        if city is incorrect @ return ['error'] 
        */
        let restaurants = ['error']
    
        return restaurants
    } else {
        
    let restaurants = await fetchRestaurants(`https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city`);
    
    return restaurants;}
};


// Exports function for testing (later to frontend also)
module.exports = mainFunc;