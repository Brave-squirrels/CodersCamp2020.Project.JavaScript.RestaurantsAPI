//Importing main function
const mainFunc = require('./restaurants-api');
const {generateBtn, append} = require('./feature-pagination');
const notValid = require('./validate');

//Display data when click on search button
function display(e){

    //Prevent from reloading page on submit 
    e.preventDefault();

    //Get DOM elements
    const result = document.querySelector('#restaurantsNavCon');
    const val = document.querySelector('#townSearch');
    const buttons = document.querySelector('#paginationContainer');
    const divData = document.querySelector('#restaurantsNavCon');
    const filter = document.querySelector('#filterRestaurants');
    const container = document.querySelector('nav');


    //Resets container by default
    result.innerHTML ='';
    buttons.innerHTML ='';
    filter.innerHTML = '';

    //Format the input
    const inputValue = val.value.trim();

        //Add value of checkbox here where is empty array
        mainFunc(inputValue).then(function(final){
            let navData = [];
            //Validation
            if(final[0]==='incorrect syntax'){
                notValid(val);
            }else if(final[0]==='city does not exist'){
                container.style.display = 'grid';
                container.innerHTML = 
                    `
                        <div class='townNotFound'>
                            We can't find the restaurants in ${inputValue}.
                        </div>
                    `;
                //Scroll to the nav after submit
                container.scrollIntoView();
            }else{
                //Creating templates with data and pushing into array
                container.style.display = 'grid';
                final.forEach((n)=>{
                    //data-name - get this on click and base on that display restaurant
                    navData.push(`<div id='resDiv' class='resDiv' data-name="${n.id}">
                    <span class='resTitle'>
                        ${n.name}
                    </span>
                    <span class='resCs'>
                        ${n.address}
                    </span>
                    <span class='resAdr'>
                        ${n.rating}
                    </span>
                    <img src="//cdn.clipartsfree.net/vector/small/50542-right-grey-arrow-icon.png" alt="" class='resImg'>
                    </div>`);
                });

                //Save data to localStorage for future
                localStorage.setItem("data", JSON.stringify(final));

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
                        <label for="${n}" id="filterLabel">${n}</label>
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

                        //Getting restaurants with matching cuisines
                            final.forEach((n)=>{
                                const splitArr = n.cuisines.split(',');
                                const rez = filterArray.some(r => splitArr.includes(r));
                                if(rez){
                                    tmpNavData.push(`<div id='resDiv' class='resDiv data-name="${n.id}"'>
                                    <span class='resTitle'>
                                        ${n.name}
                                    </span>
                                    <span class='resCs'>
                                        ${n.address}
                                    </span>
                                    <span class='resAdr'>
                                        ${n.rating}
                                    </span>
                                    <img src="//cdn.clipartsfree.net/vector/small/50542-right-grey-arrow-icon.png" alt="" class='resImg'>
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

                //To append pass array with data, element that will contain the buttons, element that will contain data
                //Add event to generate buttons
                document.addEventListener('click', (e)=>{
                    generateBtn(e);
                    append(navData, buttons, divData);
                });
                
                //Scroll to the nav after submit
                container.scrollIntoView();
            }
        })
}

//Exporting main function
module.exports = display;
