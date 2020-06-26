const express = require('express');
const app = express();
const path = require('path');
const fs=require('fs');
const bodyparser=require('body-parser');

const port = 7862;

//MONGOOSE DATABASE RELATED STUFF...
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/response_of_foodweb', { useNewUrlParser: true, useUnifiedTopology: true});

//Defining Mongoose Schema...
const responseSchema = new mongoose.Schema({
    name: String ,
    email: String,
    no: String,
    message: String,
});
const Response = mongoose.model('response', responseSchema);

//EXPRESS RELATED STUFF...
app.use('/static', express.static('static'))  //Serving static files
app.use(express.urlencoded())

//PUG RELATED STUFF...
app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');  // Set the template engine as pug
app.set('views', path.join(__dirname, 'views'));  //Set the views directory

//ENDPOINTS..
app.get('/', (req, res) => {
    res.status(200).render('index.pug');
});
app.post('/',(req,res)=>{
                    //FOR WRITING RESPONSE IN A FILE...
    // name=req.body.name;
    // email=req.body.email;
    // contact=req.body.no;
    // message=req.body.message;
    // let responsetowrite=`Response received from ${name} , having E-mail : ${email} and Contact no. : ${contact} , and he/she is saying that "${message}"`;
    // fs.writeFileSync('response.txt',responsetowrite);
    // console.log(req.body);
    // const params={'message':'Thanks for your Response! We will get in touvh with you shortly'};

    var myData=new Response(req.body);
    myData.save().then(()=>{
        res.render('index.pug');
    }).catch(()=>{
        res.status(400).send("This item has not been saved to the DATABASE...SORRY!!!");
    })

    // res.status(200).render('index.pug');
});


//START THE SERVER...
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});