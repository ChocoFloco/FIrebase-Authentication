const express = require("express");
const bodyParser = require("body-parser");
const ia = require("firebase/app");
const Auth = require("firebase/auth");

const firebaseConfig = {
    apiKey: "AIzaSyCSQJe1_VnTHItbrtKzG1ro0o4yC9xmOW4",
    authDomain: "authenticaton-5bad4.firebaseapp.com",
    projectId: "authenticaton-5bad4",
    storageBucket: "authenticaton-5bad4.appspot.com",
    messagingSenderId: "742327578217",
    appId: "1:742327578217:web:e2975eadc8009a8b87fcf8",
    measurementId: "G-WE310E3SPB"
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
