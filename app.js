const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html");
});

app.post("/",function(req,res){

    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;

    const data ={
        members: [
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    fname:firstname,
                    lname:lastname
                }

            }
        ]
    }
    const jsonData = JSON.stringify(data);
    
    const url = "https://us19.api.mailchimp.com/3.0/lists/536b044e05";

    const option =
    {
        method: "post",
        auth:"sanya:79ebc35979e856af4fa7ed5df1665822-us19" 

    }

   const request =  https.request(url,option,function(response){
       if(response.statusCode === 200){
           res.sendFile(__dirname + "/success.html");
       }
       else{
           res.sendFile(__dirname +"/failure.html");
    }

           response.on("data",function(data){
               console.log(JSON.parse(data));
           })
      })
    request.write(jsonData);
    request.end();
    
})
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT||3000,function(){
    console.log("The server is running");
})
 
//536b044e05
 //79ebc35979e856af4fa7ed5df1665822-us19 aPI