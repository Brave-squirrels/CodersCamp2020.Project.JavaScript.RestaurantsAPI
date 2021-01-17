//Importing main function
const {mainFunc, fetchUserReviews} = require('./restaurants-api');
const {generateBtn, append, resetState} = require('./feature-pagination');
const notValid = require('./validate');
const displayRestaurant = require('./single-res-view');
const {navTemplate, resBasicInfoTemplate, resReviewInfoTemplate} = require('./templates');
const {filterNav, addFilterContent} = require('./filter-nav');


//Display data when click on search button
function display(e){
    resetState()
    //Prevent from reloading page on submit 
    e.preventDefault();
    //Get DOM elements
    const val = document.querySelector('#townSearch');
    const container = document.querySelector('nav');
    const mainSection = document.querySelector('main');
    mainSection.style.height = '80%';
    

    //Resets container by default
    container.style.display = 'none';
    const resCnt = document.querySelector('article');
    resCnt.style.display = 'none';
    //Format the input
    const inputValue = val.value.trim();

    const loading = document.querySelector("#loading");
    loading.style.display='flex';
        //Add value of checkbox here where is empty array
    mainFunc(inputValue).then(function(result){

            //Reset DOM
            const buttons = document.querySelector('#paginationContainer');
            const divData = document.querySelector('#restaurantsNavCon');
            const filter = document.querySelector('#filterRestaurants');
            const filterViewCnt = document.querySelector('#restOfTheFilters');
            const filterBtn = document.querySelector('#filterBtn');
            filterBtn.classList.add('notFiltered');
            filterBtn.innerHTML = 'Show more filters';
            mainSection.style.height = '86%';
            
            let navData = [];
            //Validation
            if(result[0]==='incorrect syntax'){
                notValid(val);
                mainSection.style.height = '84%';
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
                    navTemplate(element,navData);
                });

                //Default append data on the first site
                append(navData, buttons, divData);

                //Get the array of all cuisines in the city
                const cuisinesAll = [];
                result.forEach((element)=>{
                    const cuisinesSplit = element.cuisines.split(',');
                    cuisinesSplit.forEach((cuisine)=>{
                        if(!cuisinesAll.includes(cuisine.trim()) && cuisine.length >=3){
                            cuisinesAll.push(cuisine.trim());
                        }
                    })
                })

                const arrayOfHTML = [];
                //Display filters
                cuisinesAll.forEach((element)=>{
                    arrayOfHTML.push(`
                        <label for="${element}" id="filterLabel" class='container'>${element}
                        <input type="checkbox" id="${element}" name="cuisineFilter" value="${element}" class="chkId">
                        <span class='checkmark'></span>
                        </label>
                    `);
                })

                
                
                //Saving the array of data
                let savedNavData = navData;

                const filterRestaurants = (e)=>{
                    //Checking target of the event
                    if(e.target.className === 'chkId'){
                        resetState();
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
                                const formatedArr = splitArr.map(el=>el.trim());
                                const rez = filterArray.some(r => formatedArr.includes(r));
                                if(rez){
                                    navTemplate(element,tmpNavData);
                                }

                            })
                        
                        //Resets data to default when unchecked
                       
                        if(tmpNavData.length === 0){
                            let check = true;
                            [...checkedValues].forEach((element)=>{
                                if(element.checked){
                                    check = false;
                                }
                            });
                            if(check===true){
                                navData = savedNavData;
                            }else{
                                navData = [];
                            }
                        }else{
                            navData = tmpNavData;
                        }
                        //Displaying filtered data and generate new buttons
                        generateBtn(e);
                        append(navData, buttons, divData);
                    }
                    
                }

                //AppendFilters
                addFilterContent(arrayOfHTML, filter);
                //Hide and show more filters
                filterNav(filter);

                //Run filter
                document.addEventListener('click', filterRestaurants);

                //To append pass array with data, element that will contain the buttons, element that will contain data
                //Add event to generate buttons
                document.addEventListener('click', (e)=>{
                    generateBtn(e);
                    append(navData, buttons, divData);
                });
                
                //Event for display single restaurant
                document.addEventListener('click', function(e){
                    const resId = e.target.dataset.name;
                    if(e.target.id === 'resDiv'){
                        const allRest = document.querySelector('#restaurantsNavCon')
                        const pageButt = document.getElementById('paginationContainer')
                        //Fetching reviews and passing into display function
                        fetchUserReviews(resId, result).then(function(res){
                            // resCnt.style.display = 'none';
                            displayRestaurant(res, resId);                        
                            // singleRest.style.animationName = 'slideOff';
                            const singleRest = document.querySelector('article')
                            singleRest.style.display = 'block'
                            singleRest.style.animationName = 'slideLeft'
                            allRest.style.display = 'none';
                            pageButt.style.display = 'none';
                        });
                    }
                });
                //Close single restaurant view and show all restaurants
                document.addEventListener('click', function(e){
                    
                    if(e.target.id === 'cross'){
                        const allRest = document.getElementById('restaurantsNavCon')
                        const pageButt = document.getElementById('paginationContainer')
                        const singleRest = document.querySelector('article')
                        singleRest.style.display = 'none'
                        allRest.style.display = 'grid';
                        pageButt.style.display = 'flex';
                        allRest.style.animationName = 'slideRight'

                    }

                });
                
                
                //Scroll to the nav after submit
                container.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            loading.style.display='none';
        })
}
//Exporting main function
module.exports = display;
