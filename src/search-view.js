//Importing main function
const mainFunc = require('./restaurants-api');

const {generateBtn, append} = require('./feature-pagination');

//Display data when click on search button
function display(){
    //Get DOM elements
    const result = document.querySelector('#restaurantsNavCon');
    const val = document.querySelector('#townSearch').value;
    const buttons = document.querySelector('#paginationContainer');
    const divData = document.querySelector('#restaurantsNavCon');
    const filter = document.querySelector('#filter');


    //Resets container by default
    result.innerHTML ='';
    buttons.innerHTML ='';
    filter.innerHTML = '';
    //Add value of checkbox here where is empty array
    const data = mainFunc(val,[]).then(function(final){
        let navData = [];
        //Creating templates with data and pushing into array
        final.forEach((n)=>{
            //To the div add info about ID to download it on click and base on that display restaurant - waiting for backend to do this
            navData.push(`<div id='resDiv' class='resDiv'>
            <span class='resTitle'>
                ${n.name}
            </span>
            <span class='resCs'>
                ${n.rating}
            </span>
            <span class='resAdr'>
                ${n.address}
            </span>
            </div>`);
        });


        //Default append data on the first site
        append(navData, buttons, divData);


        //Get the array of all cuisines in the city
        const cuisinesAll = [];
        final.forEach((n)=>{
            const cuisinesSplit = n.cuisines.split(',');
            cuisinesSplit.forEach((n)=>{
                if(!cuisinesAll.includes(n)){
                    cuisinesAll.push(n);
                }
            })
        })

        //Display filters
        cuisinesAll.forEach((n)=>{
            filter.innerHTML += `
                <label for="${n}">${n}</label>
                <input type="checkbox" id="${n}" name="cuisineFilter" value="${n}" class="chkId">
            `;
        })

        //Saving the array of data
        let savedNavData = navData;
        const filterRestaurants = (e)=>{
            //Checking target of the event
            if(e.target.className === 'chkId'){

                const filterArray = [];
                //Getting all the checkboxes
                const checkedValues = document.querySelectorAll('.chkId');

                //Pushing all checked value into the array
                [...checkedValues].forEach((n)=>{
                    if(n.checked){
                        filterArray.push(n.value);
                    }
                })

                let tmpNavData = [];

                //Getting restaurants with mathing cuisines
                    final.forEach((n)=>{
                        const splitArr = n.cuisines.split(',');
                        const rez = filterArray.some(r => splitArr.includes(r));
                        if(rez){
                            tmpNavData.push(`<div id='resDiv' class='resDiv'>
                            <span class='resTitle'>
                                ${n.name}
                            </span>
                            <span class='resCs'>
                                ${n.rating}
                            </span>
                            <span class='resAdr'>
                                ${n.address}
                            </span>
                            </div>`);
                        }

                    })
                
                //Resets data to default when unchecked
                if(tmpNavData.length !== 0){
                    navData = tmpNavData;
                }else{
                    navData=savedNavData;
                }
                //Displaying filtered data and generate new buttons
                generateBtn(e);
                append(navData, buttons, divData);

            }
        }

        //Run filter
        filter.addEventListener('click', filterRestaurants);

        //To append pass array with data, elements that will contain the buttons, element that will contain data
        //Add event to generate buttons
        document.addEventListener('click', (e)=>{
            generateBtn(e);
            append(navData, buttons, divData);
        });
        
    })
    
}

//Exporting main function
module.exports = display;
