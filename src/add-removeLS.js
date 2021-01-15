const manageLS = (objToStore, trigger)=>{
    if(trigger.checked){
        localStorage.removeItem(objToStore.id);
    }else{
        localStorage.setItem(objToStore.id, JSON.stringify(objToStore));
    }
}

module.exports = manageLS;