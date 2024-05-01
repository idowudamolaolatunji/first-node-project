const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(express.json());

const productRouter = require('./routes/productRoute');
const userRouter = require('./routes/userRoute')

app.use(cors());
app.use(morgan('dev'))

// app.use(cors({
//     origin: [
//       "http://127.0.0.1:5500",
//     ],
//     methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
// }));


app.use(function(req, res, next) {
    // console.log(req, res);
    console.log('Middleware is watching...');

    next();
});

// ROUTE MOUNTING
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)


const dbStr = 'mongodb+srv://damolaidowudavid:Roc8IrBGATId4oVL@test-cluster.fnyftxs.mongodb.net/?retryWrites=true&w=majority&appName=test-cluster';

mongoose.connect(dbStr).then(function() {
    console.log('Database connected successful...')
}).catch(err => {
    console.log(err)
})


app.listen(3000, 'localhost', function() {
    console.log('App listening on port 3000.....');
});


module.exports = app;
