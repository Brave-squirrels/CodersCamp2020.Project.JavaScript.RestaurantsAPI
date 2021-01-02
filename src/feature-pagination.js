//Setup for one page
const state = {
    //Elements on page
    'pageSize': 3,
    //On which page it starts
    'pageNumber': 1
}

//Generate slice of the array that we wanna display (depends on setup in state object)
const paginate = (obj, pageSize, pageNumber) => {   
    let current = (pageNumber-1)*pageSize;
    let endData = current + pageSize;
    return obj.slice(current, endData);
}

//Generate buttons depending on which page we are
const generatePage = (arr,btnContainer) => {
    const maxPage = Math.ceil(arr.length/state.pageSize);

    if(arr.length <= state.pageSize){
        btnContainer.innerHTML = '';
    }else{
        btnContainer.innerHTML = (state.pageNumber === 1 ) ? `<button id='btn2'>Page ${state.pageNumber+1}</button>` :
                            (state.pageNumber === maxPage ) ? `<button id='btn1'>Page ${state.pageNumber-1}</button>` :
                            `<button id='btn1'>Page ${state.pageNumber-1}</button> <br> <button id='btn2'>Page ${state.pageNumber+1}</button>`;
    }
}

//Update DOM by appending current data
const appendData = (result, arr, btnContainer, dataContainer)=>{
    generatePage(arr, btnContainer);
    dataContainer.innerHTML = result;
}

//Default data when reloading the site - envoke this in filter/search function as a setup
const append = (arr, btnContainer, dataContainer)=>{
appendData(paginate(arr, state.pageSize, state.pageNumber), arr, btnContainer, dataContainer);
}

//Switch pages events


const generateBtn = (e)=>{
    if(e.target && e.target.id== 'btn2'){
        state.pageNumber += 1;
    }else if(e.target && e.target.id == 'btn1'){
        state.pageNumber -= 1;
    }
}

module.exports = {
    generateBtn: generateBtn,
    append: append
}