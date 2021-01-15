const displayFav = (e)=>{
    const favList = document.querySelector('aside');
    const openList = document.querySelector('#favIcon');
    const closeList = document.querySelector('#closeFav');

    //Open favList
    if(e.target.id === 'favIcon'){

        if(window.innerWidth < 1000){
            favList.style.width = '100%';
        }else{
            favList.style.width = '45%';
        }

        
        favList.style.right = '0';
    }
    //Close favList
    else if(e.target.id === 'closeFav'){
        favList.style.width = '0';
        favList.style.right = '-4em';
    }

    //Display and hide modal box via envelope button
    const openModalButton = document.querySelector('#modalOpenButton');
    const closeModalButton = document.querySelector('#modalCloseButton');
    const overlay = document.getElementById('overlay');
    
    openModalButton.addEventListener('click', () => {
        const modal = document.querySelector('.modal');
        openModal(modal);
    })
    
    function openModal(modal) {
        if (modal == null) return;
        overlay.classList.add('active');
        modal.classList.add('active');
    }

    closeModalButton.addEventListener('click', () => {
        const modal = document.querySelector('.modal');
        closeModal(modal);
    })

    function closeModal(modal) {
        if (modal == null) return;
        modal.classList.remove('active');
        overlay.classList.remove('active');            
    }

    //Close modal clicking outside the modal
    overlay.addEventListener('click', () => {
        const modal = document.querySelector('.modal.active');
        closeModal(modal);
    })
}

module.exports = displayFav;