/**
 * @param {array} restaurants - array of restaurants
 * 
 * @add restaurants to cookies
 */

const saveInfo = (restaurants) => {
    let nextDay = new Date();
    nextDay.setDate(new Date().getDate() + 1);

    for (const restaurant of restaurants) {
        let name = restaurant.id;
        const cookie = name + "=" + JSON.stringify(restaurant) + ";path=/;expires=" + nextDay;
        document.cookie = cookie;
    }
};

module.exports = saveInfo;