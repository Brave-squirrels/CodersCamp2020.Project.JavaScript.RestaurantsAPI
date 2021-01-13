const obj = {

    name: "res1",
    adress: "wrocław ul. costam 1/2b",
    rating: 4/5,
    price: 11

}

//template for basic info
const createTemplateFirst = (resObj) => {
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

//template for reviews - add loop for display reviews
const createTemplateSecond = ()=>{
    return `
    <div id="reviews">
    <div class='reviews'>
        <!--Append review + te z localStorage-->
        <span class="reviewsTitle">
            Reviews
        </span>
        <!--Pull of of API-->
        <div class="singleReview">
            <span class="dish">
                "The best restaurant i've ever been!"
            </span>
            <span class="cost">
                5/5
            </span>
        </div>
        <div class="singleReview">
            <span class="dish">
                "It's fine."
            </span>
            <span class="cost">
                3/5
            </span>
        </div>
    </div>
    </div>
    `
}



//display restaurant function
const displayRestaurant = (e)=>{
    if(e.target.id === 'resDiv'){
        const resId = e.target.dataset.name;
        const resCnt = document.querySelector('article');
        const firstSectionCnt = document.querySelector('#restaurantFirst');

        resCnt.style.display = 'block';

        //Search for the result with resId (or name, doesn't matter) and pass into createTemplateFirst

        firstSectionCnt.innerHTML = createTemplateFirst(obj);

        const revButton = document.querySelector('#displayReviews');


        //display reviews
        //Here fetch the reviews and pass object to createTemplateSecond to display (fetch by id/name that we get first)

        //Or fetch reviews at start and save in variable, doesn't matter
        revButton.addEventListener('click', ()=>{
            const revCnt = document.querySelector('#restaurantSpecificInfo');
            revCnt.style.display = 'grid';
            if(revCnt.classList.contains('revDisplayed')){
                revCnt.style.display = 'none';
                revCnt.classList.remove('revDisplayed');
            }else{
                revCnt.innerHTML = createTemplateSecond(); 
                revCnt.classList.add('revDisplayed');
            }
            

        });


    }
}

module.exports = displayRestaurant;