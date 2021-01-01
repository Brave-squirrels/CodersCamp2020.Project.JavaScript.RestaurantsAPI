//Display Fav menu
document.querySelector('#favIcon').addEventListener('click',()=>{
    const favList = document.querySelector('aside');
    favList.style.width = '40%';
    favList.style.right = '0';
})

//Hide Fav menu
document.querySelector('#closeFav').addEventListener('click', ()=>{
    const favList = document.querySelector('aside');
    favList.style.width = '0';
    favList.style.right = '-4em';
})

window.addEventListener('load', (event) => {
    //this returns HTML collection, therefore normal foreach cannot be used.
    var checkboxes = document.getElementsByClassName('starFavInput');
    Array.from(checkboxes).forEach((item) => {
        item.checked = isFavourite(item.id);
    });
  });