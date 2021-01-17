//Append filters to DOM
const addFilterContent = (object, dom)=>{
    const currentFilters = object.slice(0,6);
    dom.innerHTML = '';
        currentFilters.forEach((n)=>{
        dom.innerHTML += n;
    })
    if(object.length<=6){
        return;
    }else{
        const restFiltersCnt = document.querySelector('#restOfTheFilters');
        const restFilters = object.slice(7, object.length - 1);
        restFiltersCnt.innerHTML = '';
        restFilters.forEach((n)=>{
            restFiltersCnt.innerHTML += n;
        })
    }
}


//Display or hide rest of the filters
const filterNav = (object, dom)=>{

        const filterButton = document.querySelector('#filterBtn');
        const restFiltersCnt = document.querySelector('#restOfTheFilters');
        let clicked = 0;
        filterButton.addEventListener('click',()=>{
            if(clicked === 0){
                restFiltersCnt.style.maxHeight = '5em';
                restFiltersCnt.style.transition = 'all 0.3s ease-in';
                restFiltersCnt.style.visibility = 'visible';
                filterButton.innerHTML = 'Hide';
                clicked++;
            }else if(clicked === 1){
                restFiltersCnt.style.maxHeight = '0';
                restFiltersCnt.style.transition = 'all 0.3s ease-in';
                restFiltersCnt.style.visibility = 'hidden';
                filterButton.classList.add('notFiltered');
                filterButton.innerHTML = 'Show more filters';
                clicked--;
            }
        })

}

module.exports = {
    filterNav,
    addFilterContent
}