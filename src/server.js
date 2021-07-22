const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const path = require('path');
const port = 3000;

const app = express();
dotenv.config({ path: path.join(__dirname + '/.env') });

let Task;

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to db');
    Task = require('./models/Task');
    app.listen(3000, () => console.log(`Server up and running on port ${port}`))
});

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname + '/views/'));

app.engine('handlebars', handlebars());

app.use(express.static(path.join(__dirname + '/public/')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('todolist');
});

app.post('/', async(req, res) => {
    console.log(req.body.task_name);
    const task = new Task({
        name: req.body.task_name
    });

    try {
        await task.save();
        console.log('worked')
        res.redirect('/');
    } catch (err) {
        console.log(err)
        res.redirect('/');
    }
});