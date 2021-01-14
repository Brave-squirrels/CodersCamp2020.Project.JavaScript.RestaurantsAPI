import 'regenerator-runtime/runtime'

const display = require('../src/search-view');
const displayFav = require('../src/nav-bar');
const favourites = require('../src/favourites-feature');

//Handle the favList
document.addEventListener('click', displayFav);
document.addEventListener('click', favourites.manageFavouriteRestaurant);

var addFavRestaurant = document.getElementById("favIcon");
addFavRestaurant.addEventListener('click', favourites.generateFavourites);
var exportFavourites = document.getElementById("exportFavData");
exportFavourites.addEventListener('click', favourites.exportFavourites);

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


//Handle search form
document.querySelector('#searchForm').addEventListener('submit', display);
