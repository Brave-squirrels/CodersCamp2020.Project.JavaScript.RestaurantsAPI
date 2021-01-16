import {manageSingleFavourite} from './manage-favourites-local-storage';

const favouritesKey = 'FAVOURITE_RESTAURANTS'


const manageFavouriteRestaurant = (e) => {
    if (e.target.name != 'starFavBar'){
        return
    }
    let favourites = localStorage.getItem(favouritesKey);
    // retrieve and split by comma
    let favouritesArray = favourites.split('|');
    //Check if array contains id - return boolean
    favouritesArray.forEach((item, idx) => {
        favouritesArray[idx] = JSON.parse(item)
    })
    favouritesArray.forEach(item => {
        if (item.id === e.target.id) {
            manageSingleFavourite(item, e);
        }
    })
    generateFavourites();

}

const isFavourite = (restaurantId) => {
    /* extract favourites from local storage */
    let favourites = localStorage.getItem(favouritesKey);
    // If local storage empty -> return false
    if (!favourites) {
       return false;
    }
    // retrieve and split by pipe
    let favouritesArray = favourites.split('|');

    favouritesArray.forEach((item, idx) => {
        favouritesArray[idx] = JSON.parse(item)
    })
    let favouriteInArray;
    favouritesArray.forEach(item => {
        if (item.id === restaurantId) {
            favouriteInArray = item;
        }
    })
    return !!favouriteInArray;

}

const generateFavourites = () => {
    let restaurants = getRestaurants();
    console.log('generateFavourites', restaurants)

    let favText = '';
    let noFavText = '';
    let favouritesCount = 0;
    document.getElementById('favourites').innerHTML = '';
    restaurants.forEach((restaurant) => {
        if (isFavourite(restaurant.id)) {
            favouritesCount++;
            const divId = `id="${restaurant.id}"`;
            favText += '<div class=\'resDivFav\' >' +
            '<span class=\'resTitle\' id="${restaurant.id}">' + restaurant.name + '</span>' +
            '<span class=\'resCs\'>' + restaurant.rating + '</span>' +
            '<span class=\'resAdr\'>' + restaurant.address + '</span>' +
            '<div class=\'addFav\'>' +
            '<input type="checkbox" id="' + restaurant.id + '" name="starFavBar" class="starFavInput">' +
            '<label for="' + restaurant.id + '" class="starFavBar" ></label>' +
            '</div></div>'
        }
        document.getElementById('favourites').innerHTML = favText;
    });

    if (favouritesCount === 0) {
        noFavText += '<h1>No favourites yet</h1>' +
        '<div>Search for restaurants to find what you like!</div>';
    } else {
        noFavText = '';
    }

    document.getElementById('noFav').innerHTML = noFavText;

    var checkboxes = document.getElementsByClassName('starFavInput');
    Array.from(checkboxes).forEach((item) => {
        item.checked = isFavourite(item.id);
    });
}

const exportFavourites = (e) => {
console.log('Favourites will get exported to JSON file... Eventually')
}

export {isFavourite, manageFavouriteRestaurant, generateFavourites, exportFavourites};

const getRestaurants = () => {
    let restaurants = localStorage.getItem(favouritesKey)
    let restaurantsArray;
    if (restaurants) {
        restaurantsArray = restaurants.split('|')
        restaurantsArray.forEach((item, idx) => {
            restaurantsArray[idx] = JSON.parse(item);
        })
    }

    return restaurantsArray || []
}