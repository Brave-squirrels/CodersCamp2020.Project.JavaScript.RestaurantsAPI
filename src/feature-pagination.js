//Arary with the elements
let arr =[
        `<span>hello1</span>`,
        `<span>hello2</span>`,
        `<span>hello3</span>`,
        `<span>hello4</span>`,
        `<span>hello5</span>`,
        `<span>hello6</span>`,
        `<span>hello7</span>`,
        `<span>hello8</span>`,
        `<span>hello1</span>`,
        `<span>hello2</span>`,
        `<span>hello3</span>`,
        `<span>hello4</span>`,
        `<span>hello5</span>`,
        `<span>hello6</span>`,
        `<span>hello7</span>`,
        `<span>hello8</span>`,
]

//State setup with pagination option
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
const generatePage = () => {
    const buttons = document.querySelector('#pages');
    const maxPage = Math.ceil(arr.length/state.pageSize);
    buttons.innerHTML = (state.pageNumber === 1 ) ? `<button id='btn2'>Page ${state.pageNumber+1}</button>` :
                        (state.pageNumber === maxPage ) ? `<button id='btn1'>Page ${state.pageNumber-1}</button>` :
                        `<button id='btn1'>Page ${state.pageNumber-1}</button> <br> <button id='btn2'>Page ${state.pageNumber+1}</button>`;
}

//Update DOM by appending current data
const appendData = (result)=>{
    generatePage();
    const divData = document.querySelector('#data');
    divData.innerHTML = result;
}

//Default data when reloading the site - envoke this in filter/search function as a setup
appendData(paginate(arr, state.pageSize, state.pageNumber));

//Switch pages events
document.addEventListener('click', (e)=>{
    if(e.target && e.target.id== 'btn2'){
        state.pageNumber += 1;
        appendData(paginate(arr, state.pageSize, state.pageNumber));
    }else if(e.target && e.target.id == 'btn1'){
        state.pageNumber -= 1;
        appendData(paginate(arr, state.pageSize, state.pageNumber));
    }
})