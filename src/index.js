import 'regenerator-runtime/runtime'

const mainFunc = require('../src/restaurants-api');

//Display data when click on search button (without checkbox for now)
document.querySelector('#button').addEventListener('click',()=>{
   
    const result = document.querySelector('#result');
    const val = document.querySelector('#value').value;

    result.innerHTML ='';

    //Add value of checkbox here where is empty array
    const data = mainFunc(val,[]).then(function(final){
        
        final.forEach((n)=>{
            result.innerHTML += ` <div id='resDiv' class='resDiv'>
            <span class='resTitle'>
                ${n.name}
            </span>
            <span class='resCs'>
                ${n.rating}
            </span>
            <span class='resAdr'>
                ${n.address}
            </span>
            <img src="${n.logo}'>
            </div>`;
        })
        console.log(final);
    })
})



/*
const getUserCuisines = () => {
    const allCuisines = ['Polish', 'Greek', 'Grill'];
    userCuisines = []
    allCuisines.forEach( n =>
    {if (document.getElementById(`${n}`).checked) {
        userCuisines.push(document.getElementById(`${n}`).value);
    }})
}

const fetchCusines = async()=>{
    
    let response = await fetch('https://developers.zomato.com/api/v2.1/cuisines?city_id=280', {headers: {
        'Content-type': 'application/json',
        'user-key': 'a2312f9d231f29610389057aa0a28111'}
    } )
    .then(res => res.json());
    return response;

}

const resultData = fetchCusines().then(function(rez){
    const array = [];
    rez.cuisines.forEach((n)=>{
        
        if(!array.includes(n.cuisine.cuisine_name)){
            array.push(n.cuisine.cuisine_name);
        }

    });
    console.log(array);
})
*/

