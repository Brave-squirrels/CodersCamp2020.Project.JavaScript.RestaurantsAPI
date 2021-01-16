import 'regenerator-runtime/runtime'
const {manageLSSingle,manageLSFav} = require('../src/add-removeLS');
const display = require('../src/search-view');
const displayFav = require('../src/nav-bar');
const manageFav = require('../src/manageFav');
//Handle the favList
document.addEventListener('click', displayFav);

//Handle search form
document.querySelector('#searchForm').addEventListener('submit', display);

document.addEventListener('click', ()=>{
    if(document.querySelector('.starFav'))
    manageFav();  
})
window.onload = ()=>{
    manageFav();  
}



