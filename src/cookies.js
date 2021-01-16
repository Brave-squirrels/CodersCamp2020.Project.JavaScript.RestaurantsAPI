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



/**
 * @return array of cookies as single objects
 */

const arrayOfCookies = () => {
    let cookiesArray = [];
    let cookies = document.cookie;
    let index = cookies.indexOf('=');
    cookies = cookies.split('; ');
    cookies.forEach(cookie => {
        cookie = cookie.slice(index + 1);
        cookiesArray.push(JSON.parse(cookie));
        cookie = JSON.parse(cookie);
    })
    return cookiesArray;
}



/**
 * @delete all of the cookies from cookies
 */

const deleteAllCookies = () => {
    let cookies = arrayOfCookies();
    cookies.forEach(cookie => {
        let name = cookie.id;
        document.cookie = name + "=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    })
}

/**
 * 
 * @param {string} cityName - name of the city from users input
 * 
 * @check if restaurants from current city are saved in cookies
 * @check if there are no cookies, check if no more than 2 different cities are save in cookies, if yes, delete both (error 431)
 */

const checkCookies = (cityName) => {
    if (document.cookie.includes(cityName)) {
        return true;
    } else if (document.cookie.includes('=')) {
        let cityNames = [];
        let cookies = arrayOfCookies();
        cookies.forEach(cookie => {
            if (cityNames[0] !== cookie.city) {
                cityNames.push(cookie.city)
            }
            if (cityNames.length === 2) {
                deleteAllCookies();
                return;
            }
        })
    }
}



/**
 * 
 * @param {string} cityName - name of the city
 * @param {array} restaurants - array of restaurants
 * 
 * @fetch data about restaurants from cookies
 * @return array of restaurants filled with data of restaurants from current city
 */

const getCookies = (cityName, restaurants = []) => {
    let cookies = arrayOfCookies();
    cookies.forEach(cookie => {
        if (cookie.city === cityName) {
            restaurants.push(cookie);
            return;
        }
    })
    return restaurants;
}

module.exports = {
    saveInfo,
    checkCookies,
    getCookies
};