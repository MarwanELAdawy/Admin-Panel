require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const usersRouter = require('./routers/users.router');
const placesRouter = require('./routers/places.router');
const adminRouter = require('./routers/admin.router');

const mongourl = process.env.MONGO_URL || 'mongodb://localhost:27017/test';
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyparser.json());
app.use('/users', usersRouter);
app.use('/users/:userId/places', placesRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => res.send('Hello World!'));

const run = async () => {
    await mongoose.connect(mongourl, {
        useNewUrlParser: true
    })
    await app.listen(port, () => {
        console.log(`app listening on port ${port}!`);
    })
}

run()
