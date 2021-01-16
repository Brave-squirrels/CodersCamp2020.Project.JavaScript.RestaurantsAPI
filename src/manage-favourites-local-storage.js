//Add restaurant to fav and change the style of stars and Fav view star
import {isFavourite} from './favourites-feature';
import displayRestaurant from "./single-res-view";

const favouritesKey = 'FAVOURITE_RESTAURANTS'

const manageFavouriteRestaurantNavigation = (e) => {
    if (e.target.className !== 'resDivFav'){
        return
    }
    console.log(e)
    let favourites = localStorage.getItem(favouritesKey);
    // If local storage empty -> return false
    if (!favourites) {
        return false;
    }
    // retrieve and split by pipe
    let favouritesArray = favourites.split('|');

    favouritesArray.forEach((item, idx) => {
        favouritesArray[idx] = JSON.parse(item)
    })
    let favouriteInArray = {};
    favouritesArray.forEach(item => {
        if (item.id === e.target.id) {
            favouriteInArray = item;
        }
    })
    console.log('ADD DISPLAYRESTAURANT F-CTION')
    displayRestaurant([favouriteInArray], favouriteInArray.id)

}
const manageSingleFavourite = (objToStore, trigger)=>{

    trigger.checked = !isFavourite(trigger.id);
    let favourites = localStorage.getItem(favouritesKey)
    if(!favourites) {
        localStorage.setItem(favouritesKey, JSON.stringify(objToStore))
        return;
    }
    favourites = favourites.split('|');
    favourites.forEach((item, idx) => {
    favourites[idx] = JSON.parse(item);
    })
    let favouriteInArray;
    favourites.forEach(item => {
        if (item.id === objToStore.id) {
            favouriteInArray = item;
        }
}   )
    let favouritesString = ''
    if(favouriteInArray) {
        favourites.splice(favourites.indexOf(favouriteInArray), 1)
        favourites.forEach((item, idx) => {
            favourites[idx] = JSON.stringify(item);
        })
        favouritesString = favourites.join('|');
        localStorage.setItem(favouritesKey, favouritesString)
    }
    else {
        favourites.push(objToStore)
        favourites.forEach((item, idx) => {
            favourites[idx] = JSON.stringify(item);
        })
        favouritesString = favourites.join('|');
        localStorage.setItem(favouritesKey, favouritesString)
    }
}

//Add listener to star in fav and change single res star style and remove from localStorage using ID of object (stored in value of star)
//By trigger param pass e.target
const manageFavFavourite = (objId, trigger)=>{
    const secondStar = trigger.id.replace('fav', '');
    const secondChk = document.querySelector(`#${CSS.escape(secondStar)}`)
        if(!trigger.checked){
            localStorage.removeItem(objId);
            trigger.checked = false;
            secondChk.checked = false;
        }
}


export {manageSingleFavourite, manageFavFavourite, manageFavouriteRestaurantNavigation}