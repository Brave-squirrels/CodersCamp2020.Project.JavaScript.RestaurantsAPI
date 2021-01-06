const saveToLocalStorage = (restaurants, cityName) => {
    /*
        @ saves restuarants json in current city to cookies for 24hrs
    */

    let nextDay = new Date();
    nextDay.setDate(new Date().getDate() + 1);

    document.cookie = `restaurants in ${cityName} = ${JSON.stringify(restaurants)}; expires = ${nextDay}`
};

module.exports = saveToLocalStorage;