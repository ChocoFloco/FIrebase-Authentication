const express = require("express");
const bodyParser = require("body-parser");
const ia = require("firebase/app");
const Auth = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyC7mybMry1LzLSlpsmXMlN_9LbcPogoW2g",
  authDomain: "inverseprivate-304e0.firebaseapp.com",
  projectId: "inverseprivate-304e0",
  storageBucket: "inverseprivate-304e0.appspot.com",
  messagingSenderId: "246587992179",
  appId: "1:246587992179:web:aa224363a30a5e532ca206",
  measurementId: "G-VWNPDLNQJ0"
};


const app = express();
const app2 = ia.initializeApp(firebaseConfig);


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/signup",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});
app.get("/login",function(req,res){
    res.sendFile(__dirname + "/login.html");
});

app.post("/signup",function(req,res){

    let fname = req.body.fname;
    let lname = req.body.lname;
    var email = req.body.email;
    var password = req.body.password;

    const auth = Auth.getAuth();
    Auth.createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    res.sendFile(__dirname + "/success.html");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    res.send("Fail");
    // ..
  });
    
});

app.post("/login",function(req,res){

    var email = req.body.email;
    var password = req.body.password;
    const auth = Auth.getAuth();
    Auth.signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        res.sendFile(__dirname + "/success.html");
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.send("Fail");
});

});


app.listen(3000, function(){
    console.log("Server running on port 3000");
});
