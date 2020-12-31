//Importing main function
const mainFunc = require('./restaurants-api');


//Pagination state
const state = {
    //Elements on page
    'pageSize': 3,
    //On which page it starts
    'pageNumber': 1
}

//Display data when click on search button
function display(){
    //Get DOM elements
    const result = document.querySelector('#restaurantsNavCon');
    const val = document.querySelector('#townSearch').value;
    const buttons = document.querySelector('#paginationContainer');
    const divData = document.querySelector('nav');

    //Resets container by default
    result.innerHTML ='';
    buttons.innerHTML ='';
    //Add value of checkbox here where is empty array
    const data = mainFunc(val,[]).then(function(final){
        const tablica = [];
        //Creating templates with data and pushing into array
        final.forEach((n)=>{
            //To the div add info about ID to download it on click and base on that display restaurant - waiting for backend to do this
            tablica.push(` <div id='resDiv' class='resDiv'>
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
            </div>`);
        })

        //Pagination functions

        //Slice the array of templates
        const paginate = (obj, pageSize, pageNumber) => {   
            let current = (pageNumber-1)*pageSize;
            let endData = current + pageSize;
            return obj.slice(current, endData);
        }
        
        //Generate buttons depending on which page we are
        const generatePage = () => {
            const maxPage = Math.ceil(tablica.length/state.pageSize);
            buttons.innerHTML = (state.pageNumber === 1 ) ? `<button id='btn2'>Page ${state.pageNumber+1}</button>` :
                                (state.pageNumber === maxPage ) ? `<button id='btn1'>Page ${state.pageNumber-1}</button>` :
                                `<button id='btn1'>Page ${state.pageNumber-1}</button> <br> <button id='btn2'>Page ${state.pageNumber+1}</button>`;
        }
        
        //Update DOM by appending current data
        const appendData = (result)=>{
            generatePage();
            divData.innerHTML = result;
        }
        
        //Switch pages events
        document.addEventListener('click', (e)=>{
            if(e.target && e.target.id== 'btn2'){
                state.pageNumber += 1;
                appendData(paginate(tablica, state.pageSize, state.pageNumber));
            }else if(e.target && e.target.id == 'btn1'){
                state.pageNumber -= 1;
                appendData(paginate(tablica, state.pageSize, state.pageNumber));
            }
        })
        
        //Default append data on the first site
        appendData(paginate(tablica, state.pageSize, state.pageNumber));
    })
}

//Exporting main function
module.exports = display;



//Some demo - doesn't matter right now
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
