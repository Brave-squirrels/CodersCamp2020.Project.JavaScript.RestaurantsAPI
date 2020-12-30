import 'regenerator-runtime/runtime'

const mainFunc = require('../src/restaurants-api');


const state = {
    //Elements on page
    'pageSize': 3,
    //On which page it starts
    'pageNumber': 1
}

//Display data when click on search button
document.querySelector('#button').addEventListener('click',()=>{
   
    const result = document.querySelector('#result');
    const val = document.querySelector('#value').value;

    result.innerHTML ='';

    //Add value of checkbox here where is empty array
    const data = mainFunc(val,[]).then(function(final){
        const tablica = [];
        final.forEach((n)=>{
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
        const paginate = (obj, pageSize, pageNumber) => {   
            let current = (pageNumber-1)*pageSize;
            let endData = current + pageSize;
            return obj.slice(current, endData);
        }
        
        //Generate buttons depending on which page we are
        const generatePage = () => {
            const buttons = document.querySelector('#pages');
            const maxPage = Math.ceil(tablica.length/state.pageSize);
            buttons.innerHTML = (state.pageNumber === 1 ) ? `<button id='btn2'>Page ${state.pageNumber+1}</button>` :
                                (state.pageNumber === maxPage ) ? `<button id='btn1'>Page ${state.pageNumber-1}</button>` :
                                `<button id='btn1'>Page ${state.pageNumber-1}</button> <br> <button id='btn2'>Page ${state.pageNumber+1}</button>`;
        }
        
        //Update DOM by appending current data
        const appendData = (result)=>{
            generatePage();
            const divData = document.querySelector('#result');
            divData.innerHTML = result;
        }
        
        //Default data when reloading the site - envoke this in filter/search function as a setup
        
        
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
        
        appendData(paginate(tablica, state.pageSize, state.pageNumber));
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

