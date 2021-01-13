import 'regenerator-runtime/runtime'

const display = require('../src/search-view');
document.querySelector('#searchForm').addEventListener('submit', display);
const displayFav = require('../src/nav-bar');
const displayRestaurant = require('../src/single-res-view');

//Handle the favList
document.addEventListener('click', displayFav);

//Handle single-res-view
document.addEventListener('click', displayRestaurant);
