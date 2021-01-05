const saveToLocalStorage = async(restaurants, cityName) => {
    await localStorage.setItem(`restaurants in ${cityName}`, JSON.stringify(restaurants));
};

module.exports = saveToLocalStorage;