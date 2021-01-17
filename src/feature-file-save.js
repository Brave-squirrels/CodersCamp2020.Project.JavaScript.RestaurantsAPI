/**
 * @param {array} restaurants 
 * 
 * @download basic info about favourite restaurants as txt file
 */

const createTxtFile = async(restaurants) => {
    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    if (restaurants[0] === undefined) {
        return;
    }
    let text = "";

    restaurants.forEach(restaurant => {
        text += `Restaurant name: ${restaurant.name}\nRestaurant Rating: ${restaurant.rating}\nRestaurant Address: ${restaurant.address}\nRestaurant Phone: ${restaurant.phone}\nRestaurant Cuisines: ${restaurant.cuisines}\n\n\n`;
    })

    // Start file download.
    download('MyFavouriteRestaurants.txt', text);

}



module.exports = createTxtFile;