import 'regenerator-runtime/runtime'

const display = require('../src/search-view');
document.querySelector('#searchForm').addEventListener('submit', display);
// const data = JSON.parse(localStorage.getItem("data") -- get data of the elements in the nav