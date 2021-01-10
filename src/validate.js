const notValid = (inputDOM) => {
    inputDOM.classList.add("invalid");
    setTimeout(function(){
        inputDOM.classList.remove('invalid');
    }, 500);
}

module.exports = notValid;