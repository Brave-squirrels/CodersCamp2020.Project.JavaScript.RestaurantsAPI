const fetch = require('node-fetch')

// looking for restaurants based o user input
const getCityName = 'poznan';
const userCuisines = ['European', 'American'];



const fetchData = async(url) => {
    /*
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
        @ return number (city id)
        - searches for city id based on city name
    */

    let res = await fetchData(url);
    let cityId = res.location_suggestions[0].city_id;
    return cityId;
}

const fetchRestaurants = async(url) => {
    /*
        @ returns JSON object
        - filtres restaurants in the city by:
            - cuisines type
        - creates a JSON object with main informations about filtred restaurants:
            -photo url
            -name
            -address
            -average rating
    */

    let result = await fetchData(url);
    let restaurantsFromCity = { name: [], logo: [], address: [], rating: [] };
    for (const item of result.restaurants) {
        let restaurantCuisines = JSON.stringify(item.restaurant.cuisines);
        if (userCuisines.some(cuisine => restaurantCuisines.includes(cuisine))) { // <----
            restaurantsFromCity.name.push(item.restaurant.name);
            restaurantsFromCity.logo.push(item.restaurant.photos_url);
            restaurantsFromCity.address.push(item.restaurant.location.address);
            restaurantsFromCity.rating.push(item.restaurant.user_rating.aggregate_rating);
        }

    }
    return restaurantsFromCity;
}

(async() => {
    /*
        main function
    */

    let cityId = await fetchCity(`https://developers.zomato.com/api/v2.1/locations?query=${getCityName}`);

    let restaurants = await fetchRestaurants(`https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city`);

    console.log(JSON.stringify(restaurants))


})();