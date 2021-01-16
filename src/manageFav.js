const {manageLSSingle,manageLSFav} = require('./add-removeLS');
const displayRestaurant = require('./single-res-view');

const manageFav = ()=>{

    //Getting everything from localStorage
    const arr = [];
    const dataArr = [];

    let values = [];
    let keys = Object.keys(localStorage);


    for(let i=0; i<keys.length; i++){
        values.push(JSON.parse(localStorage.getItem(keys[i])));
    }

    const favCnt = document.querySelector('#favourites');
    favCnt.innerHTML = '';
    if(values.length === 0){
        dataArr.push('No restaurants');
    }else{
        //Getting all data from LS
       values.forEach((n)=>{
        let checkbox = ``;
        if(localStorage.getItem(n.id) !== null){
            checkbox = ` <input type="checkbox" name="starFav" class="starFavInput" id='${n.id}fav' value='${n.id}fav' checked>
            <label  class="starFav" for='${n.id}fav' id='${n.id}fav' ></label>`;
        }else{
            checkbox = ` <input type="checkbox" name="starFav" class="starFavInput" id='${n.id}fav'  value='${n.id}fav'>
            <label  class="starFav" for='${n.id}fav' id='${n.id}fav' ></label>`;
        }
        dataArr.push(`
        <div id='resDivFav' class='resDiv' data-name="${n.id}" >
        <span class='resTitle' id='${n.id}'>
            ${n.name}
        </span>
        <span class='resCs'>
            ${n.address}
        </span>
        <span class='resAdr'>
            ${n.rating}
        </span>
        <div class='imgArrow'>
            ${checkbox}
        </div>
    </div>`
        );
       })

       document.addEventListener('click', (e)=>{
            if(e.target.className === 'starFav'){
                manageLSFav(e.target.id,e.target);
                manageFav();
            }else if(e.target.className === 'resTitle'){
                displayRestaurant(values,e.target.id);
                document.querySelector('article').scrollIntoView({
                    behavior: 'smooth'
                })
                const favList = document.querySelector('aside');
                favList.style.width = '0';
                favList.style.right = '-4em';  
            }
        });


    }
    dataArr.forEach((n)=>{
        favCnt.innerHTML += n;
    })

    
    
    

}

module.exports = manageFav;