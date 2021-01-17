const {manageLSSingle,manageLSFav} = require('./add-removeLS');
const displayRestaurant = require('./single-res-view');

//Main function
const manageFav = ()=>{

    //Getting all the keys from LS
    const dataArr = [];

    let values = [];
    let keys = Object.keys(localStorage);

    //Getting all of the objects
    for(let i=0; i<keys.length; i++){
        values.push(JSON.parse(localStorage.getItem(keys[i])));
    }

    //Pushing HTML template of every object in LS
    const favCnt = document.querySelector('#favourites');
    const noFav = document.querySelector('#noFav');
    favCnt.innerHTML = '';
    noFav.innerHTML = '';
    if(values.length === 0){
       noFav.innerHTML = `
            <h1>No favourites yet</h1>
            <div>Search for restaurants to find what you like!</div>
        `;
        return;
    }else{
       values.forEach((n)=>{ 
        dataArr.push(`
        <div id='resDivFav' class='resDivFav' data-name="${n.id}" >
            <span class='resTitle' id='${n.id}fav'>
                ${n.name}
            </span>
            <span class='resCs'>
                ${n.address}
            </span>
            <span class='resAdr'>
                ${n.rating}
            </span>
            <div class='addFav'>
                <input type="checkbox" name="starFav" class="starFavInput" id='${n.id}fav' value='${n.id}fav' checked>
                <label  class="starFavLabel" for='${n.id}fav' id='${n.id}fav' ></label>
            </div>
        </div>`
        );
       })
       //Adding event listener to remove fav and link to restaurant onclick
       document.addEventListener('click', (e)=>{
            if(e.target.className === 'starFavLabel'){
                manageLSFav(e.target.id,e.target);
                manageFav();
            }else if(e.target.className === 'resTitle'){
                const string = e.target.id.replace('fav', '');
                displayRestaurant(values,string);
                document.querySelector('article').scrollIntoView({
                    behavior: 'smooth'
                })
                const favList = document.querySelector('aside');
                favList.style.width = '0';
                favList.style.right = '-4em';  
            }
        })
    }
    //Appending all the data
    dataArr.forEach((n)=>{
        favCnt.innerHTML += n;
    })
}

module.exports = manageFav;