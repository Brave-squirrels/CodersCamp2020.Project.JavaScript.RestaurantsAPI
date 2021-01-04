const format = /[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]+/;

const validateTown = (inputValue) => {  
    return !isNaN(inputValue) || inputValue.length === 0 || format.test(inputValue);
}

const notValid = (inputDOM) => {
    inputDOM.classList.add("invalid");
    setTimeout(function(){
        inputDOM.classList.remove('invalid');
    }, 500);
}

module.exports = {
    validateTown: validateTown,
    notValid: notValid
}