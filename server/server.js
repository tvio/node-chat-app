const path = require('path');
const express = require ('express');
const app = express();
const publicPath = path.join(__dirname,'../public');

var port = process.env.PORT || 3000;

app.use(express.static(publicPath));
app.get('/',(req,res)=>res.send('Ahojky'));
app.listen(port,()=>console.log(`Chat app bezi na portu ${port}`));



// console.log(__dirname+ '/../public');
// console.log(publicPath);