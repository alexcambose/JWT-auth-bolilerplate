const en = require('./en');
const Polylang = require('polylang');
const polylang = new Polylang();

polylang.add('en', en);

module.exports = polylang;