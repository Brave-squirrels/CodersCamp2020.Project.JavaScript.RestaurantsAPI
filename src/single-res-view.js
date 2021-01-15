const {mainFunc, fetchUserReviews} = require('./restaurants-api');
const {navTemplate, resBasicInfoTemplate, resReviewInfoTemplate} = require('./templates');


//display restaurant function
const displayRestaurant = (result, resId)=>{
        const resCnt = document.querySelector('article');
        const firstSectionCnt = document.querySelector('#restaurantFirst');  
        const revCnt = document.querySelector('#restaurantSpecificInfo');
        
        resCnt.style.display = 'block';
        revCnt.innerHTML = '';
        //Take the restaurant with this ID from result
        let objOfReviews = [];
        result.map((n)=>{
                if(n.id === resId){
                    objOfReviews = n;
                }
        })

            //Append the base data
            firstSectionCnt.innerHTML = resBasicInfoTemplate(objOfReviews);
        
            //Handle review show button
            const revButton = document.querySelector('#displayReviews');
            revCnt.classList.remove('revDisplayed');
            revButton.addEventListener('click', ()=>{
                revCnt.style.display = 'grid';
                if(revCnt.classList.contains('revDisplayed')){
                    revCnt.style.display = 'none';
                    revCnt.classList.remove('revDisplayed');
                    document.querySelector('article').scrollIntoView({
                        behavior: 'smooth'
                    })
                }else{
                    revCnt.innerHTML = resReviewInfoTemplate(objOfReviews); 
                    revCnt.classList.add('revDisplayed');
                    revCnt.scrollIntoView({
                        behavior: 'smooth'
                    })
                }
            });
}

module.exports = displayRestaurant;