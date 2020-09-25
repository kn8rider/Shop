const express = require('express');
const router = express.Router();



router.post("/register",function({body}, res) {    //registration form req

  if(!Object.values(body).every((val) => val)) {
      return res.send({ message: "ALl Fields are required." });
    }
    
    if(body.password !== body.password_confirm){
      return res.send({ message: "Password doesn't match." });

  }

  const user = new User();
  user.firstname = body.first_name.trim();
  user.lastname = body.last_name.trim();

  user.email = body.email;
  user.setPassword(body.password);

  user.save((err, newUser) => {
    if(err) {
      res.status(400).json(err);
    }else{
      res.status(200).json({ message: "Created User", user: newUser});
    }

  });


});


router.post("/login", function(req, res) {        //authentication req
  if(!req.body.email || !req.body.password){
    return res.status(400).json({ message: "All fields are required."});
  }

  passport.authenticate("local", (err, user, info) => {
    if(err) {
      return res.status(404).json(err);
    }
    if(user) {
      res.status(201).json({ message: "Logged IN."});
    } else {
      res.status(401).json(info);
    }
  })(req, res);

});


module.exports = router;
