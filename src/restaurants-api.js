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
    let cityId = res.location_suggestions[0].city_id;
    return cityId;
}

const fetchRestaurants = async(url, userCuisines) => {
    /*
        -parameters (url, userCuisines (array of cuisines))
        @ returns JSON objec
        - filtres restaurants in the city by user cusines / if userCuisines is empty, returns all restaurants:
            - cuisines type
        - creates a JSON array with objects(for each restaurant new object) with main informations about filtred restaurants:
            -restaurant id
            -name of restaurant
            -photo url
            -cuisines
            -price bracket of the restaurant(1-4)
            -address
            -phone number
            -average rating
            
    */

    const addRestaurant = (item) => {
        restaurantsFromCity.push({
            id: item.restaurant.id,
            name: item.restaurant.name,
            logo: item.restaurant.photos_url,
            cuisines: item.restaurant.cuisines,
            price: item.restaurant.price_range,
            address: item.restaurant.location.address,
            phone: item.restaurant.phone_numbers,
            rating: item.restaurant.user_rating.aggregate_rating
        })
    }

    const noCuisines = userCuisines.length === 0;

    let result = await fetchData(url);
    let restaurantsFromCity = []


    for (const item of result.restaurants) {
        if (noCuisines) {
            addRestaurant(item);
        } else {
            let restaurantCuisines = JSON.stringify(item.restaurant.cuisines);
            if (userCuisines.some(cuisine => restaurantCuisines.includes(cuisine))) {
                addRestaurant(item);
            }
        }
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


const mainFunc = async(getCityName, userCuisines) => {
    /*
        main function
        -parameters (string eg.'wroclaw', array of strings eg. ['Italian'])
    */
    


    // Returns empty array if no CityName was provided
    if (getCityName.length === 0) return [];

    let cityName = await replacePolishChar(getCityName);

    let cityId = await fetchCity(`https://developers.zomato.com/api/v2.1/locations?query=${cityName}`);

    let restaurants = await fetchRestaurants(`https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city`, userCuisines);

    return restaurants;
};

// Exports function for testing (later to frontend also)
module.exports = mainFunc;
