// Jan 1st 1970 00:00:00 am UTC - Unix timestamp, dale je plus, driv minus
// -1000 je seknda driv pred 1970 jan 1

var moment = require('moment');

// // var date = new Date();

// // console.log(date.getMonth());

// var date = moment();
// date.add(100,'year').subtract(9,'months');
// //MMM kratka verze, lze psat bez formatu
// console.log(date.format('DD-MM-YYYY HH:MM:SS'));

// //10:35 am

// console.log(date.format('h:mm a'));

var cas = moment().valueOf();
console.log(cas);