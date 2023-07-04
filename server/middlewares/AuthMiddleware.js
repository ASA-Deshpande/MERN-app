const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if (!accessToken) return res.json({ error: "User not logged in!"});
else{

    try{
        const validToken = verify(accessToken, "somevimportantsecret");
        //validtoken now contains the unhashed username n id, so we can do something like below
        //const username = validToken.username;
    
        req.user = validToken; //now can access it wherever we use the middleware
    
        //console.log("in try block");
        if(validToken) {
            //console.log("in validation");
            return next();
        }
    
    }
    catch(err){
    //console.log("in catch block");
    return res.json({error: err});
    }
    
}



};

module.exports = {validateToken};



// const { sign, verify } = require("jsonwebtoken");

// const createTokens = (user) => {
//   const accessToken = sign(
//     { username: user.username, id: user.id },
//     "jwtlkjdfoiejjdslfjlsdfowefjlff.xffieedslj"
//   );

//   return accessToken;
// };

// const validateToken = (req, res, next) => {
//   const accessToken = req.cookies["access-token"];

//   if (!accessToken)
//     return res.status(400).json({ error: "User not Authenticated!" });

//   try {
//     const validToken = verify(accessToken, "jwtlkjdfoiejjdslfjlsdfowefjlff.xffieedslj");
//     if (validToken) {
//       req.authenticated = true;
//       return next();
//     }
//   } catch (err) {
//     return res.status(400).json({ error: err });
//   }
// };

// module.exports = { createTokens, validateToken };