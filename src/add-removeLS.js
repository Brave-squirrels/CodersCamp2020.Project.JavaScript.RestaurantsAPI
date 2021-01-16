//Add restaurant to fav and change the style of stars and Fav view star
const manageLSSingle = (objToStore, trigger)=>{
    const secondStar = trigger.id;
        if(!trigger.checked){
            localStorage.removeItem(objToStore.id);
            trigger.checked = false;
        }else{
            localStorage.setItem(objToStore.id, JSON.stringify(objToStore));
            trigger.checked = true;
        }
}

//Add listener to star in fav and change single res star style and remove from localStorage using ID of object (stored in value of star)
//By trigger param pass e.target
const manageLSFav = (objId, trigger)=>{
    const secondStar = trigger.id.replace('fav', '');
    const secondChk = document.querySelector(`#${CSS.escape(secondStar)}`)
        if(!trigger.checked){
            localStorage.removeItem(secondStar);
            secondChk.checked = false;
        }
}

module.exports = {
    manageLSSingle,
    manageLSFav
} 