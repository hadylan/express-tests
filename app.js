const express = require('express')

const app = express();
const PORT = 4001;

const test2 = (req, res, next) => {
    res.send('This is a test GET');
}

const test1 = (req, res, next) => {
    console.log('Login successfull!')
    test2(req, res, next)
}

app.use(['/test/', '/test/:id'], (req, res, next) => {
    req.on('end', () => {
        console.log('Middleware call');
    });
    next();
});

app.get('/test', (test1));

app.get('/test/:id', (req, res, next) => {
    if (req.params.id && !isNaN(req.params.id)) {
        res.send(`This is a test GET with type number param! ${typeof req.params.id}`)
    } else {
        res.status(404).send('ERROR! id param must be type number!')
    }
});

app.put('/test/:id', (req, res, next) => {
    const updateParams = req.query;
    if (req.query.age && !isNaN(req.query.age)) {
        if (req.query.name) {
            res.send(updateParams);
        } else {
            res.status(404).send('ERROR: name param is required!')
        }
    } else {
        res.status(404).send('ERROR: age param must be type number!');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});