import 'regenerator-runtime/runtime'

const display = require('../src/search-view');
document.querySelector('#searchForm').addEventListener('submit', display);