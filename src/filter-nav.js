const filterNav = (object, dom)=>{
    const currentFilters = object.slice(0,6);

    const restFilters = object.slice(7,object.length - 1 );
    
    currentFilters.forEach((n)=>{
        dom.innerHTML += n;
    })

    const filterButton = document.querySelector('#przycisk');

    filterButton.classList.add('notFiltered');

    filterButton.addEventListener('click',()=>{
        if(filterButton.classList.contains('notFiltered')){
            restFilters.forEach((n)=>{
                dom.innerHTML += n;
            })
            filterButton.classList.remove('notFiltered');
            filterButton.innerHTML = 'Hide';
        }else{
            dom.innerHTML = '';
            currentFilters.forEach((n)=>{
                dom.innerHTML += n;
            })
            filterButton.classList.add('notFiltered');
            filterButton.innerHTML = 'Expand';
        }
    })

}

module.exports = filterNav;