const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

//routes
const todoRoutes = require('./routes/todo')

//middlewares


mongoose.connect('mongodb://node-shop:' + process.env.MONGO_ATLAS_PWD + '@cluster0-shard-00-00-zweme.mongodb.net:27017,cluster0-shard-00-01-zweme.mongodb.net:27017,cluster0-shard-00-02-zweme.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', {
    useNewUrlParser: true
}).then(() => console.log('Mongodb connected and running..')).catch((e) => console.error(e));
  

mongoose.Promise = global.Promise;
// app.set('public',__dirname + '/public');
app.use(express.static(__dirname+'/public'))
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());




// to prevent CORS error
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept,Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
})



app.use('/todo', todoRoutes);



app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })

})

module.exports = app;

