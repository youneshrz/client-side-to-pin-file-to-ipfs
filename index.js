
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const fs = require('fs');
const pinataSDK = require('@pinata/sdk');
const app = express();
const port = 4000; 

const pinata = new pinataSDK({ pinataApiKey:'76a350c63bf5cc2571d3', pinataSecretApiKey:'4ce16cedf0df55dd5a410a0768f6fa3d7324a4af023cb6f2cab400a5b1438292'});

app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.post("/recharch", async (req, res) => {
   
  const filters = {
    metadata:{
        name:req.body.name
    }
 };
   pinata.testAuthentication().then(async (result) =>  {
     //handle successful authentication here
     await pinata.pinList(filters).then((result) => {
         //handle results here

         res.send(result.rows)

     }).catch((err) => {
         //handle error here
         console.log(err);
     });
     
 }).catch((err) => {
     //handle error here
     console.log(err);
 });
  });
 app.get("/getall",async(req,res)=>{
    pinata.testAuthentication().then(async (result) =>  {
        //handle successful authentication here
        await pinata.pinList().then((respo) => {
            //handle results here
           
            res.send(respo)
             
        }).catch((err) => {
            //handle error here
            console.log(err);
        });
        
    }).catch((err) => {
        //handle error here
        console.log(err);
    });
     });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });