const fetch = require('node-fetch')

// looking for restaurants based o user input
const getCityName = 'poznan';
const userCuisines = ['European', 'American'];

// 

const fetchData = async(url) => {
    /*
        @ returns json object
        -fetching data from api
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
        @ returns int (city id)
        -filter locations by city name
        -get id of city found
    */

    let res = await fetchData(url);
    let cityId = res.location_suggestions[0].city_id;
    return cityId;
}


const fetchRestaurants = async(url) => {
    /*
        @ returns json object
        -filter restaurants by:
            -city name
            -cuisines type
        - create an array of filtred restaurants with:
            -address
            -name
            -average rating
            -logo url
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
        @ main function"
    */


    let cityId = await fetchCity(`https://developers.zomato.com/api/v2.1/locations?query=${getCityName}`);

    let restaurants = await fetchRestaurants(`https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city`);

    console.log(JSON.stringify(restaurants))


})();