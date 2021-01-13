import 'regenerator-runtime/runtime'

const display = require('../src/search-view');
const displayFav = require('../src/nav-bar');

//Handle the favList
document.addEventListener('click', displayFav);

//Handle search form
document.querySelector('#searchForm').addEventListener('submit', display);
