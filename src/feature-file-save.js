const { create } = require('domain');
const fs = require('fs');

const createFolder = async() => {
    /*
        @ creates new folder if one does not simply exist... my precious...
    */

    fs.mkdir('FavouriteRestaurants', { recursive: true }, err => {
        if (err) throw new Error(err);
    })
}

const createTxtFile = async(restaurants) => {
    /*
        - parameters (object array)
        @ creates txt file with favourite restaurants name
    */

    await createFolder();

    await restaurants.forEach(restaurant => {
        fs.appendFile('FavouriteRestaurants/MyFavRestaurants.txt', `Restaurant name: ${restaurant.name} Address: ${restaurant.address} Rating: ${restaurant.rating} Phone: ${restaurant.phone} Cuisines: ${restaurant.cuisines.join(' ')}\n`, (err) => {
            if (err) throw new Error(err);
        })
    })
}

module.exports = createTxtFile;