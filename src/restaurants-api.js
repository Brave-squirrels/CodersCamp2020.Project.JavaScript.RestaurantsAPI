const fetch = require('node-fetch')

// looking for restaurants based on user input


/* Getting client's cuisines preferation

const getUserCuisines = () => {
    const allCuisines = ['Polish', 'Greek', 'Grill']   -We have to add all cuisines here
    userCuisines = []
    allCuisines.forEach( n =>
    {if (document.getElementById(`${n}`).checked) {
        userCuisines.push(document.getElementById(`${n}`).value);
    }})
}
 */



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
        - creates a JSON array with objects(for each restaurant new object) with main informations about filtred restaurants:
            -photo url
            -name
            -address
            -average rating
    */
    let result = await fetchData(url);
   let restaurantsFromCity = [] 
   for (const item of result.restaurants) {
       let restaurantCuisines = JSON.stringify(item.restaurant.cuisines);
       if (userCuisines.some(cuisine => restaurantCuisines.includes(cuisine))) { // <----
           restaurantsFromCity.push(
               {
                   name: item.restaurant.name,
                   logo: item.restaurant.photos_url,
                   address: item.restaurant.location.address,
                   rating: item.restaurant.user_rating.aggregate_rating

               }
           )
           
       }
       
   }
   return restaurantsFromCity;
}

(async() => {
    /*
        main function
    */
    // await getUserCuisines() add when submit ready 
    let cityId = await fetchCity(`https://developers.zomato.com/api/v2.1/locations?query=${getCityName}`);

    let restaurants = await fetchRestaurants(`https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city`);

    console.log(JSON.stringify(restaurants))


})();


// Get info about client's cousines preferation:

// document.getElementById('submit').addEventListener('click', getAllInfo)