var moment = require('moment');
var generateMessage = (from, text)=>{
    return {
        from,
        text,
        datum: moment().valueOf()
    };

};


var generateLocationMessage = (from, latitude, longitude)=>{
    return {
        from,
        url:`https://www.google.com/maps?q=${latitude},${longitude}`,
        datum: moment().valueOf()
    };

};

module.exports = {generateMessage, generateLocationMessage};