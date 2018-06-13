var generateMessage = (from, text)=>{
    return {
        from,
        text,
        datum: new Date().getTime()
    };

};

module.exports = {generateMessage};