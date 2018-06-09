const path = require('path');
const express = require ('express');
const app = express();
const publicPath = path.join(__dirname,'../public');

app.use(express.static(publicPath));
app.get('/',(req,res)=>res.send('Ahojky'));
app.listen(3000,()=>console.log('Chat app bezi na portu 3000'));



console.log(__dirname+ '/../public');
console.log(publicPath);