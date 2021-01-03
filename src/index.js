const displayFav = require('../src/nav-bar');
const favourites = require('../src/favourites-feature');

//Handle the favList
document.addEventListener('click', displayFav);
document.addEventListener('click', favourites.manageFavouriteRestaurant);
var el = document.getElementById("favIcon");
el.addEventListener('click', favourites.generateFavourites);

document.querySelectorAll('.starFav').forEach(item => {
    item.addEventListener('click', favourites.manageHTMLFavourite);
});

window.addEventListener('load', (event) => {
    //this returns HTML collection, therefore normal foreach cannot be used.
    var checkboxes = document.getElementsByClassName('starFavInput');
    Array.from(checkboxes).forEach((item) => {
        item.checked = favourites.isFavourite(item.id);
    });
  });
 
