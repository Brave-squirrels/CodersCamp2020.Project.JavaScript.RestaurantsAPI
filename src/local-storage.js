const saveToLocalStorage = (restaurant) => {
    /*
        @ saves restuarant as object
    */

    let nextDay = new Date();
    nextDay.setDate(new Date().getDate() + 1);

    document.cookie = `${restaurant.id} = ${JSON.stringify(restaurant)}; expires = ${nextDay}`
};

module.exports = saveToLocalStorage;