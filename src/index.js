//Display Fav menu
document.querySelector('#favTrigger').addEventListener('click',()=>{
    const favList = document.querySelector('#favList');
    favList.style.width = '100%';
    favList.style.right = '0';
})

//Hide Fav menu
document.querySelector('#closeFav').addEventListener('click', ()=>{
    const favList = document.querySelector('#favList');
    favList.style.width = '0';
    favList.style.right = '-2em';
})