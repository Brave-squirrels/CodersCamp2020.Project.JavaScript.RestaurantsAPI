const filterNav = (object, dom)=>{
    if(object.length <=6){
        currentFilters.forEach((n)=>{
            dom.innerHTML += n;
        })
    }else{
        const currentFilters = object.slice(0,6);

        const restFilters = object.slice(7,object.length - 1 );
        
        currentFilters.forEach((n)=>{
            dom.innerHTML += n;
        })

        const filterButton = document.querySelector('#filterBtn');

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
                filterButton.innerHTML = 'Show more filters';
            }
        })
    }
}

module.exports = filterNav;