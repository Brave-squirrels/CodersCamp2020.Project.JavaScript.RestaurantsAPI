const saveInfo = (restaurants, cityName) => {
    /*
        @ save to cookies all restaurants from the current city 
    */

    let nextDay = new Date();
    nextDay.setDate(new Date().getDate() + 1);

    document.cookie = `${cityName} = ${JSON.stringify(restaurants)}; expires = ${nextDay}`
};

module.exports = saveInfo;