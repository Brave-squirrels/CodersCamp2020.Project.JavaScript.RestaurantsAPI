//Add restaurant to fav and change the style of stars and Fav view star
const manageLSSingle = (objToStore, trigger)=>{
        if(trigger.checked === false){
            localStorage.setItem(objToStore.id, JSON.stringify(objToStore));
            trigger.checked = true;
        }else if(trigger.checked === true){
            localStorage.removeItem(objToStore.id);
            trigger.checked = false;
        }
}

//Add listener to star in fav and change single res star style and remove from localStorage using ID of object (stored in value of star)
//By trigger param pass e.target
const manageLSFav = (objId, trigger)=>{
    const secondStar = trigger.id.replace('fav', '');
    const secondChk = document.querySelector(`#${CSS.escape(secondStar)}`)
        if(!trigger.checked){
            localStorage.removeItem(secondStar);
            if(secondChk){
                secondChk.checked = false;
            }
        }
}

module.exports = {
    manageLSSingle,
    manageLSFav
} 