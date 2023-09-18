import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var userIsAuthorised = false;

app.use(bodyParser.urlencoded({extended:true}));

function pass(req,res,next)
{
    const password=req.body["password"];
     if(password=="helloworld")
     {
        userIsAuthorised=true;
     }
     next();
}
app.use(pass);

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check",(req,res)=>{
    if(userIsAuthorised==true)
    {
        res.sendFile(__dirname + "/public/secret.html");
    }
    else
    {
        res.redirect("/");
    }
})

app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
})