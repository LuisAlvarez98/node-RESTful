function authenticator(req, res, next){
    console.log("Authenticating...");
    next(); //go to next middleware
}
module.exports = authenticator;