const express = require('express');
const morgan = require('morgan');
const app = express();
const mainPage = require('./views/main');
const { db, models } = require('./models');
const Sequelize = require('sequelize');
const wikiRouter = require('./routes/wiki.js');
const userRouter = require('./routes/user.js');


app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

const init = async () => {
    await db.authenticate();
    console.log('Connected to the database...');
    await db.sync({ force: true });
    console.log('Synced to database...')
    app.listen(3000, () => {
	console.log("Listening...");
    })
}

init();

app.get('/', (req, res) =>{
    res.redirect('/wiki');
})


