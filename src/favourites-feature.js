const favouritesKey = 'FAVOURITE_RESTAURANTS'

const manageFavouriteRestaurant = (e) => {
    if (e.target.name != 'starFav'){
        return
    }
    const restaurantId = e.target.id;
    /* extract favourites from local storage */
    let favourites = localStorage.getItem(favouritesKey);
    /* If local storage empty -> add restaurant to favourites */
    if (!favourites) {
        localStorage.setItem(favouritesKey, restaurantId);
        generateFavourites();
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
    generateFavourites();
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

const generateFavourites = () => {
    let restaurants = getRestaurants();
    let favText = '';
    let noFavText = '';
    let favouritesCount = 0;
    restaurants.forEach((restaurant) => {
        if (isFavourite(restaurant.id)) {
            favouritesCount++;
            favText += '<div class=\'resDiv\'>' +
            '<span class=\'resTitle\'>' + restaurant.name + '</span>' +
            '<span class=\'resCs\'>' + restaurant.rating + '</span>' +
            '<span class=\'resAdr\'>' + restaurant.address + '</span>' +
            '<div class=\'addFav\'>' +
            '<input type="checkbox" id="' + restaurant.id + '" name="starFav" class="starFavInput">' +
            '<label for="' + restaurant.id + '" class="starFav" ></label>' +
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

const sendToRestaurantView = (e) => {
    //if (e.target.name = )
}

export {isFavourite, manageFavouriteRestaurant, generateFavourites, exportFavourites, sendToRestaurantView};

const getRestaurants = () => {
    let restaurants = [
        {
            'id': 'res1',
            'name': 'Rstaurant 1 name',
            'rating': 'Rating1',
            'address': 'Address 1'
        },
        {
            'id': 'res2',
            'name': 'Rstaurant 2 name',
            'rating': 'Rating2',
            'address': 'Address 2'
        },
        {
            'id': 'res3',
            'name': 'Rstaurant 3 name',
            'rating': 'Rating3',
            'address': 'Address 3'
        }
    ];
    return restaurants
}