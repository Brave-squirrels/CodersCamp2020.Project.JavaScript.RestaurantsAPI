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

const generateFavourites = () => {
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
    let html = '';
    restaurants.forEach((restaurant) => {
        html += '<div class=\'resDiv\'>' +
        '<span class=\'resTitle\'>' + restaurant.name + '</span>' +
        '<span class=\'resCs\'>' + restaurant.rating + '</span>' +
        '<span class=\'resAdr\'>' + restaurant.address + '</span>' +
        '<div class=\'addFav\'>' +
        '<input type="checkbox" id="' + restaurant.id + '" name="starFav" class="starFavInput">' +
        '<label for="' + restaurant.id + '" class="starFav" ></label>' +
        '</div></div>'
    })
    document.getElementById('favourites').innerHTML = html;

    var checkboxes = document.getElementsByClassName('starFavInput');
    Array.from(checkboxes).forEach((item) => {
       item.checked = isFavourite(item.id);
    });
}

const manageHTMLFavourite = (e) => {
    let restaurantId = e.target.id;
    console.log(e, restaurantId);
    let fav = document.getElementById('favourites').innerHTML;

}

export {isFavourite, manageFavouriteRestaurant, generateFavourites, manageHTMLFavourite};
