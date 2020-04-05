//const startupDebugger = require('debug')('app:startup');
//const dbDebugger = require('debug')('app:db');//DEBUG env
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home')
const authenticator = require('./authenticator');
const express  = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views','./views') //default
//MiddleWare
app.use(express.json());
//Url encoder
app.use(express.urlencoded({extended: true})); //key=value&key=value
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/',home);

/**
 * Configuration 
 */
console.log('Application Name: ' + config.get('name'));
console.log("Mail Server: " + config.get('mail.host'));
console.log("Mail Password: " + config.get('mail.password'));//export password=1234
//export NODE_ENV=production used to change environment variable.
if(app.get('env') === 'development'){
    app.use(morgan('tiny')); //Logs the requests.
   console.log("Morgan enabled...")
}
//Custom middleware runs in sequence
app.use(logger);

app.use(authenticator);


// PORT Environment Variable
// export PORT=5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));