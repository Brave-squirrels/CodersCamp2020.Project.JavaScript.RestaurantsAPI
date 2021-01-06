const { TestScheduler } = require('jest');

// Imports testing function
const mainFunc = require('../src/restaurants-api');

// Test for correct restaurant name
test('should return Siesta Trattoria', async() => {
    const data = await mainFunc('wroclaw');
    expect(data[0].name).toBe('Siesta Trattoria');
}, 17000);

// Test for empty parameters
test('should return empty array', async() => {
    const data = await mainFunc('');
    expect(data).toEqual([]);
}, 17000);

// Tests if rating is correct number
test('should be a number in range 0-5', async() => {
    const data = await mainFunc('krakow');
    const correctRating = /([0-4]+.+[0-9])|5/
    expect(data[0].rating).toMatch(correctRating);
}, 17000);

// Testing latin letters
test('should return Siesta Trattoria (latin letters)', async() => {
    const data = await mainFunc('wrocław');
    expect(data[0].name).toBe('Siesta Trattoria');
}, 17000);

// Testing latin and uppercase letters
test('should return rating (latin letters nad upper case)', async() => {
    const data = await mainFunc('Kraków');
    const correctRating = /([0-4]+.+[0-9])|5/
    expect(data[0].rating).toMatch(correctRating);
}, 17000);

// Test for no cuisines
test('should return return Bar-a-Boo (no cuisines at all)', async() => {
    const data = await mainFunc('Poznań');
    expect(data[0].name).toBe('Bar-a-Boo');
}, 17000);