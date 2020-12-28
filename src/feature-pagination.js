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
    
]

//State which will be updated
const state = {
    'pageSize': 3,
    'pageNumber': 1
}

//generate slice of the array that we wanna display
const paginate = (obj, pageSize, pageNumber)=>{   
    
    let current = (pageNumber-1)*pageSize;
    let endData = current + pageSize;
    
    return obj.slice(current, endData);
}

//generate buttons
const generatePage = ()=>{
    const buttons = document.querySelector('#pages');
        if(state.pageNumber === 1){
        buttons.innerHTML = ` <button id='btn2'>Page ${state.pageNumber+1}</button>`;
        }
        
        else if(state.pageNumber>1 && state.pageNumber < Math.ceil(arr.length/state.pageSize)){      
        buttons.innerHTML = `
            <button id='btn1'>Page ${state.pageNumber-1}</button> <br>
            <button id='btn2'>Page ${state.pageNumber+1}</button>
        `;
        }else{
            buttons.innerHTML = `<button id='btn1'>Page ${state.pageNumber-1}</button>`;
        }
}

//appending elements the the DOM
const appendData = (result)=>{
    generatePage();
    let divData = document.querySelector('#data');
    divData.innerHTML = result;
}

//default data when reloading the site
appendData(paginate(arr,state.pageSize, state.pageNumber));


//switch pages
document.addEventListener('click', (e)=>{
    if(e.target && e.target.id== 'btn2'){
        state.pageNumber += 1;
        appendData(paginate(arr,state.pageSize, state.pageNumber));
    }else if(e.target && e.target.id == 'btn1'){
        state.pageNumber -=1;
        appendData(paginate(arr,state.pageSize, state.pageNumber));
    }
})

