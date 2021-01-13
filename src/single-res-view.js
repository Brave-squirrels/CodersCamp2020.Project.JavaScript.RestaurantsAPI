//template for basic info
const createTemplateFirst = (resObj) => {
    return `
    <div class="restaurantIntro">

        <span class='restaurantName'>
            ${resObj.name}
        </span>

        <span class='restaurantAdress'>
            ${resObj.address}
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
            <span>Price rating:</span> ${resObj.priceRaiting}zł
        </span>
    </div>

    <button id='displayReviews' class='displayReviews'>Reviews</button>
    `
}

//template for reviews - add loop for display reviews
const createTemplateSecond = (obj)=>{
    let templateString = ``;
    if(obj.length === 0){
        templateString =  `
        <div class='noRevFound'>
            There's no reviews for this restaurant
        </div>
        `;
    }else{
        let tempString = ``;
        obj.reviews.forEach((n)=>{

            tempString += `
                <div class="singleReview">
                    <span class="dish">
                        ${n.testReview}
                    </span>
                    <span class="cost">
                        ${n.ratingReview}
                    </span>
            `

        });
        templateString = `
        <div id="reviews">
        <div class='reviews'>
            <span class="reviewsTitle">
                Reviews
            </span>
            ${tempString}
        </div>
        </div>
        `;
    }
    return templateString;
}



//display restaurant function
const displayRestaurant = (e)=>{
    if(e.target.id === 'resDiv'){
        const resId = e.target.dataset.name;
        const resCnt = document.querySelector('article');
        const firstSectionCnt = document.querySelector('#restaurantFirst');

        resCnt.style.display = 'block';
        //Search for the result with resId (or name, doesn't matter) and pass into createTemplateFirst
        //result - fetch result 
        const objOfReviews = result.map((n)=>{
            if(n.id === resId){
                return n;
            }
        })


        firstSectionCnt.innerHTML = createTemplateFirst(objOfReviews);

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
                revCnt.innerHTML = createTemplateSecond(objOfReviews); 
                revCnt.classList.add('revDisplayed');
            }
            

        });


    }
}

module.exports = displayRestaurant;