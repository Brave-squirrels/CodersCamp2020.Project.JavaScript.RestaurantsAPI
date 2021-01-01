const favouritesKey = 'FAVOURITE_RESTAURANTS'

const manageFavouriteRestaurant = (restaurantId) => {
    /* extract favourites from local storage */
    let favourites = localStorage.getItem(favouritesKey);
    /* If local storage empty -> add restaurant to favourites */
    if (!favourites) {
        localStorage.setItem(favouritesKey, restaurantId);
        return
    }
        //  Else -> retrieve and split by comma
    let favouritesArray = favourites.split(',');
//Check if array contains id
    // if (favouritesArray.indexOf(restaurantId) >= 0) {
// if true -> rmove from array
    let index = favouritesArray.indexOf(restaurantId);
    if (index > -1) {
        favouritesArray.splice(index, 1);
    }
// else -> add to array;
    else {
        favouritesArray.push(restaurantId);
    }
// then join array by comma and save (setItem)
    favourites = favouritesArray.join(',');
    localStorage.setItem(favouritesKey, favourites);
}

const isFavourite = (restaurantId) => {
    /* extract favourites from local storage */
    let favourites = localStorage.getItem(favouritesKey);
    // If local storage empty -> return false
    if (!favourites) {
       return false;
    }
    // retrieve and split by comma
    let favouritesArray = favourites.split(',');
    //Check if array contains id - return boolean
    let index = favouritesArray.indexOf(restaurantId);
    if (index > -1) {
        return true;
    }
    return false;
}

export {isFavourite, manageFavouriteRestaurant};
