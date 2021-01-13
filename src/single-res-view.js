const obj = {

    name: "res1",
    adress: "wrocław ul. costam 1/2b",
    rating: 4/5,
    price: 11

}

const createTemplate = (resObj) => {

    return `
    <div class="restaurantIntro">

        <span class='restaurantName'>
            ${resObj.name}
        </span>

        <span class='restaurantAdress'>
            ${resObj.adress}
        </span>

    <input type="checkbox" name="starFav" class="starFavInput" id='sample'>
    <label  class="starFav" for='sample' ></label>

    </div>

    <img src="https://www.eldynamic.com/en/img/restaurant.jpeg" alt="restauration" class='restaurantImg'>

    <div class="restaurantAvg">

        <span class='restaurantAvgRating'>
            <span>Average rating:</span> ${resObj.rating}
        </span>

        <span class='restaurantAvgCost'>
            <span>Average cost for a couple:</span> ${resObj.price}zł
        </span>
    </div>

    <button id='displayReviews' class='displayReviews'>Reviews</button>
    `
    

}


const displayRestaurant = (e)=>{
    if(e.target.id === 'resDiv'){
        const resId = e.target.dataset.name;
        const resCnt = document.querySelector('article');
        const firstSectionCnt = document.querySelector('#restaurantFirst');

        resCnt.style.display = 'block';

        //Search for the res with id that we get

        firstSectionCnt.innerHTML = createTemplate(obj);

    }
}

module.exports = displayRestaurant;