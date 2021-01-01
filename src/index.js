const displayFav = require('../src/nav-bar');
const favourites = require('../src/favourites-feature');

//Handle the favList
document.addEventListener('click', displayFav);

window.addEventListener('load', (event) => {
    console.log("Onload check log.");
    //this returns HTML collection, therefore normal foreach cannot be used.
    var checkboxes = document.getElementsByClassName('starFavInput');
    Array.from(checkboxes).forEach((item) => {
        item.checked = favourites.isFavourite(item.id);
    });
  });
