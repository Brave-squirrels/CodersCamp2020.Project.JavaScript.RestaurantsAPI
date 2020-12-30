const fs = require('fs');

const createFolder = async() => {
    /*
        @ creates new folder if one does not simply exist... my precious...
    */

    fs.mkdir('FavouriteRestaurants', { recursive: true }, err => {
        if (err) throw new Error(err);
    })
}

const createTxtFile = async(restaurantNames) => {
    /*
        - parameters (string array)
        @ creates txt file with favourite restaurants name
    */

    await createFolder();

    await restaurantNames.forEach(restaurantName => {
        fs.writeFile('FavouriteRestaurants/MyFavRestaurants.txt', `${restaurantName}\n`, (err) => {
            if (err) throw new Error(err);
        })
    })
}