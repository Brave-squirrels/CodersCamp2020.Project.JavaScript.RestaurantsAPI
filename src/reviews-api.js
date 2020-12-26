const fetch = require('node-fetch');

const fetchData = async(url) => {
    /*
        -parameter url
        @ return JSON object
        -Fetches data
    */

    let response = await fetch(url, {
            headers: {
                'Content-type': 'application/json',
                'user-key': 'cefadeea597a26b826b019c3b72190b1'
            }
        })
        .then(res => res.json());
    return response;
}


const fetchUserReviews = async(restaurantId) => {
    /*
        - parameters (Id of restaurant)
        - return array of users reviews about restaurant
    */
    let listOfReviews = [];
    let result = await fetchData(`https://developers.zomato.com/api/v2.1/reviews?res_id=${restaurantId}`);

    for (const item of result.user_reviews){
        if (item.review.review_text!=''){
        listOfReviews.push(item.review.review_text)
    }
    };
    return listOfReviews;
}

