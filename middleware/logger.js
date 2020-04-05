function log(req, res, next){
    console.log("Logging...");
    next(); //go to next middleware
}
module.exports = log;