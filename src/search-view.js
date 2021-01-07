//Importing main function
const {mainFunc} = require('./restaurants-api');
const {generateBtn, append} = require('./feature-pagination');
const notValid = require('./validate');

//Creating template string for restaurant nav
const pushTemplate = (obj, arr)=>{
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
                <img src="//cdn.clipartsfree.net/vector/small/50542-right-grey-arrow-icon.png" alt="" class='resImg'>
            </div>`);
}


//Display data when click on search button
function display(e){

    //Prevent from reloading page on submit 
    e.preventDefault();
    document.querySelector('main').style.height = '79%';
    //Get DOM elements
    const val = document.querySelector('#townSearch');
    const container = document.querySelector('nav');
    const mainSection = document.querySelector('main');

    //Resets container by default
    container.style.display = 'none';
    document.querySelector('article').style.display = 'none';
    //Format the input
    const inputValue = val.value.trim();

    const loading = document.querySelector("#loading");
    loading.style.display='flex';
        //Add value of checkbox here where is empty array
        mainFunc(inputValue).then(function(result){
            mainSection.style.height = '85%';
            const buttons = document.querySelector('#paginationContainer');
            const divData = document.querySelector('#restaurantsNavCon');
            const filter = document.querySelector('#filterRestaurants');
            let navData = [];
            //Validation
            if(result[0]==='incorrect syntax'){
                notValid(val);
                mainSection.style.height = '79%';
            }else if(result[0]==='city does not exist'){
                container.style.display = 'grid';
                divData.style.display = 'none';
                buttons.style.display = 'none';
                filter.style.display = 'none';
                container.innerHTML += 
                    `
                        <div class='townNotFound'>
                            Sorry, we can't find the restaurants in <br> <br> ${inputValue}
                        </div>
                    `;
                //Scroll to the nav after submit
                container.scrollIntoView();
            }else{
                if(container.contains(document.querySelector('.townNotFound'))){
                    container.removeChild(document.querySelector('.townNotFound'));
                }
                divData.innerHTML ='';
                buttons.innerHTML ='';
                filter.innerHTML = '';
                divData.style.display = 'grid';
                buttons.style.display = 'flex';
                filter.style.display = 'grid';
                //Creating templates with data and pushing into array
                container.style.display = 'grid';
                result.forEach((element)=>{
                    //data-name - get this on click and base on that display restaurant
                    pushTemplate(element,navData);
                });

                //Default append data on the first site
                append(navData, buttons, divData);

                //Get the array of all cuisines in the city
                const cuisinesAll = [];
                result.forEach((element)=>{
                    const cuisinesSplit = element.cuisines.split(',');
                    cuisinesSplit.forEach((cuisine)=>{
                        if(!cuisinesAll.includes(cuisine.trim())){
                            cuisinesAll.push(cuisine.trim());
                        }
                    })
                })

                //Display filters
                cuisinesAll.forEach((element)=>{
                    filter.innerHTML += `
                        <label for="${element}" id="filterLabel" class='container'>${element}
                        <input type="checkbox" id="${element}" name="cuisineFilter" value="${element}" class="chkId">
                        <span class='checkmark'></span>
                        </label>
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
                        [...checkedValues].forEach((element)=>{
                            if(element.checked){
                                filterArray.push(element.value);
                            }
                        })

                        let tmpNavData = [];

                        //Getting restaurants with matching cuisines
                            result.forEach((element)=>{
                                const splitArr = element.cuisines.split(',');
                                const rez = filterArray.some(r => splitArr.includes(r));
                                if(rez){
                                    pushTemplate(element,tmpNavData);
                                }

                            })
                        
                        //Resets data to default when unchecked
                       

                        navData = (tmpNavData.length !== 0) ? tmpNavData :
                                  savedNavData;

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
            loading.style.display='none';
        })
        
}

//Exporting main function
module.exports = display;
