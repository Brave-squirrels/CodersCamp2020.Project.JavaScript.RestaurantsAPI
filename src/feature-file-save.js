const fs = require('fs');



/**
 *  @create folder if one does not simply exist 
 */

const createFolder = async() => {
    fs.mkdir('FavouriteRestaurants', { recursive: true }, err => {
        if (err) throw new Error(err);
    })
}



/**
 * @param {array} restaurants 
 * 
 * @save basic info about favourite restaurants to txt file
 */

const createTxtFile = async(restaurants) => {
    await createFolder();

    await restaurants.forEach(restaurant => {
        fs.writeFile('FavouriteRestaurants/MyFavRestaurants.txt', `Restaurant name: ${restaurant.name} Address: ${restaurant.address} Rating: ${restaurant.rating} Phone: ${restaurant.phone} Cuisines: ${restaurant.cuisines.join(' ')}\n`, (err) => {
            if (err) throw new Error(err);
        })
    })
}



module.exports = createTxtFile;