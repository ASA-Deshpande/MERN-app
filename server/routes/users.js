const express = require('express')
const router = express.Router()
const { users } = require("../models"); 
const bcrypt = require("bcrypt");
const {sign} = require('jsonwebtoken');
const {validateToken} = require("../middlewares/AuthMiddleware")


router.post("/", async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        users.create({
            username: username,
            password: hash,
        });
        res.json("Success");
    });
});


router.post("/login", async(req, res) => {
    const {username, password } = req.body;
    const user = await users.findOne({where: {username: username} });

    if(!user) {
        res.json({error: "User doesn't exist"});
    }
    else{
    bcrypt.compare(password, user.password).then((match) => {
        if(!match) {
            res.json({error: "Wrong username and password combo, try another password"});
        }
        else{
            const accessToken = sign({username: user.username, id: user.id}, 
                "somevimportantsecret");
        //res.json("You logged in!!");
        res.json(accessToken);
    }
    });
}
});

router.get('/auth', validateToken, (req, res) => {
    res.json(req.user);
});

// router.post("/login", async (req, res) => {
//     const {username, password } = req.body;
//     const user = await users.findOne({ where: { username: username } });

//   if (!user) res.status(400).json({ error: "User Doesn't Exist" });

//   const dbPassword = user.password;
//   bcrypt.compare(password, dbPassword).then((match) => {
//     if (!match) {
//       res
//         .status(400)
//         .json({ error: "Wrong Username and Password Combination!" });
//     } else {
//       const accessToken = createTokens(user);

//       res.cookie("access-token", accessToken, {
//         maxAge: 60 * 60 * 24 * 30 * 1000,
//         httpOnly: true,
//       });

//       res.json("LOGGED IN");
//     }
//   });
// });



module.exports = router
