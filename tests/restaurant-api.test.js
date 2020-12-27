const { TestScheduler } = require('jest');

// Imports testing function
const mainFunc = require('../src/restaurants-api');

// Test for correct restaurant name
test('should return Burger Ltd', async() => {
    const data = await mainFunc('wroclaw', ['American']);
    expect(data[0].name).toBe('Burger Ltd');
});

// Test for empty parameters
test('should return empty array', async() => {
    const data = await mainFunc('', []);
    expect(data).toEqual([]);
});

// Test if img url is correct url
test('should return some correct url', async() => {
    const data = await mainFunc('wroclaw', ['Italian']);
    const correctURL = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
    expect(data[0].logo).toMatch(correctURL);
});

// Tests if rating is correct number
test('should be a number in range 0-5', async() => {
    const data = await mainFunc('krakow', ['Italian']);
    const correctRating = /([0-4]+.+[0-9])|5/
    expect(data[0].rating).toMatch(correctRating);
});

// Testing latin letters
test('should return Burget Ltd (latin letters)', async() => {
    const data = await mainFunc('wrocław', ['American']);
    expect(data[0].name).toBe('Burger Ltd');
});

// Testing latin and uppercase letters
test('should return rating (latin letters nad upper case)', async() => {
    const data = await mainFunc('Kraków', ['Italian']);
    const correctRating = /([0-4]+.+[0-9])|5/
    expect(data[0].rating).toMatch(correctRating);
});