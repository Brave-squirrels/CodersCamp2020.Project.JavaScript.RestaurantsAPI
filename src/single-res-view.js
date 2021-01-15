const {mainFunc, fetchUserReviews} = require('./restaurants-api');

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

    <!-- Button for e-mail send -->
    <button id="modalOpenButton" class="modalOpenButton">Send</button>

    <input type="checkbox" name="starFav" class="starFavInput" id='${resObj.id}' value='${resObj.id}'>
    <label class="starFav" for='${resObj.id}'></label>

    <!-- Modal Section -->
    <div id="modal" class="modal">
        <div class="modalHeader">
            <div class="modalTitle">Send e-mail notification about that restaurant</div>
            <button id="modalCloseButton" class="modalCloseButton">&times;</button>
        </div>
        <div class="modalBody">
            Write an e-mail address below and send notification about that restaurant directly!
            <form>
                <input type="text" placeholder="e-Mail">
                <button>Submit</button>
            </form>
        </div>
    </div>
    <div id="overlay"></div>


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



//display restaurant function
const displayRestaurant = (result, resId)=>{
        const resCnt = document.querySelector('article');
        const firstSectionCnt = document.querySelector('#restaurantFirst');  
        resCnt.style.display = 'block';
        
        //Take the restaurant with this ID from result
        let objOfReviews = [];
        result.map((n)=>{
                if(n.id === resId){
                    objOfReviews = n;
                }
        })

            //Append the base data
            firstSectionCnt.innerHTML = createTemplateFirst(objOfReviews);
        
            //Handle review show button
            const revButton = document.querySelector('#displayReviews');
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
            

            //Display and hide modal box via envelope button
            const openModalButton = document.querySelector('#modalOpenButton');
            const closeModalButton = document.querySelector('#modalCloseButton');
            const overlay = document.getElementById('overlay');
            
            openModalButton.addEventListener('click', () => {
                const modal = document.querySelector('.modal');
                openModal(modal);
            })
            
            function openModal(modal) {
                if (modal == null) return;
                overlay.classList.add('active');
                modal.classList.add('active');
            }

            closeModalButton.addEventListener('click', () => {
                const modal = document.querySelector('.modal');
                closeModal(modal);
            })

            function closeModal(modal) {
                if (modal == null) return;
                modal.classList.remove('active');
                overlay.classList.remove('active');            
            }

            //Close modal clicking outside the modal
            overlay.addEventListener('click', () => {
                const modal = document.querySelector('.modal.active');
                closeModal(modal);
            })
}

module.exports = displayRestaurant;