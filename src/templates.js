//Template for navigation
const navTemplate = (obj, arr)=>{
    arr.push(`<div id='resDiv' class='resDiv' data-name="${obj.id}">
                <span class='resTitle'>
                    ${obj.name}
                </span>
                <span class='resCs'>
                    ${obj.address}
                </span>
                <span class='resAdr'>
                    ${obj.rating}
                </span>
                <div class='imgArrow'>
                    <img src="//cdn.clipartsfree.net/vector/small/50542-right-grey-arrow-icon.png" alt="" class='resImg'>
                </div>
            </div>`);
}

//Template for restaurant main info
const resBasicInfoTemplate = (resObj) => {
    let checkbox = ``;
    if(localStorage.getItem(resObj.id) !== null){
        checkbox = ` <input type="checkbox" name="starFav" class="starFavInput" id='${resObj.id}' value='${resObj.id}' checked>
        <label  class="starFav" for='${resObj.id}' ></label>`;
    }else{
        checkbox = ` <input type="checkbox" name="starFav" class="starFavInput" id='${resObj.id}'  value='${resObj.id}'>
        <label  class="starFav" for='${resObj.id}' ></label>`;
    }


    let RestaurantPriceRating
    switch(resObj.priceRaiting) {
        case 1:
            RestaurantPriceRating = '$'
            break
        case 2:
            RestaurantPriceRating = '$$'
            break
        case 3:
            RestaurantPriceRating = '$$$'
            break
        case 4:
            RestaurantPriceRating = '$$$$'
            break
        default:
            RestaurantPriceRating = ''
            break
    }

    return `
    <div class="restaurantInfo">

        <img src="https://www.eldynamic.com/en/img/restaurant.jpeg" alt="restauration" class='restaurantImg'>
        <div class="restaurantIntro">

        <span class='restaurantName'>
            ${resObj.name}
        </span>

        <span class='restaurantAdress'>
            ${resObj.address}
        </span>
        

        </div>
        
        ${checkbox}
        
    
        
    </div>
    <div class="restaurantAvg">

        <span class='restaurantAvgRating'>
            <span>Average rating:</span> ${resObj.rating}
        </span>

        <span class='restaurantAvgCost'>
            <span>Price rating:</span> ${RestaurantPriceRating}
        </span>
    </div>

    <button id='displayReviews' class='displayReviews'>Reviews</button>
    `
}

//Template for restaurant reviews
const resReviewInfoTemplate = (obj)=>{
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
                        ${n.textReview}
                    </span>
                    <span class="cost">
                        Rate: ${n.ratingReview}/5
                    </span>
                </div>
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

module.exports = {
    navTemplate,
    resBasicInfoTemplate,
    resReviewInfoTemplate
}