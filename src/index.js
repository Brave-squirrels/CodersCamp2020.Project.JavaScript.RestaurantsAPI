import 'regenerator-runtime/runtime'

const display = require('../src/search-view');
document.querySelector('#searchForm').addEventListener('submit', display);
const displayFav = require('../src/nav-bar');

//Handle the favList
document.addEventListener('click', displayFav);
