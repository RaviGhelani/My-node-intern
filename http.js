const Joi = require('joi')
const express = require('express')
const app = express();
app.use(express.json());
const courses = [
    {
        id: 1,
        name: 'Cource 1'
    },
    {
        id: 2,
        name: 'Cource 2'
    },
    {
        id: 3,
        name: 'Cource 3'
    },

]

app.get('/', function (req, res) {
    res.send('Hello user');
});

app.get('/api/course', function (req, res) {
    res.send(courses);
});

app.get('/api/course/:id', function (req, res) {
    console.log(req.params);
    const replay = courses.find(c => c.id === parseInt(req.params.id));
    if (!replay)
        res.status(404).send("Data not Avalable");
    else {
        res.send(replay);
    }

    res.end();
});

app.post('/api/course', async function (req, res) {
    const schema = Joi.object({
        name: Joi.string().min(4).required()
    })

    console.log(req.body)

    try {
        // const value = await schema.validateAsync({ name: req.body.name });

        const value = await schema.validateAsync(req.body);
        console.log("value", value)

    }
    catch (err) {
        console.log("err", err)
        res.status(500).send(err.details[0].message);

        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    courses.push(course)
    res.send(course);
});

app.put('/api/course/:id', async function (req, res) {
    const replay = courses.find(c => c.id === parseInt(req.params.id));
    if (!replay) {
        res.status(404).send("Course not avalable");
    }

    const schema = Joi.object({
        name: Joi.string().min(4).required()
    })

    console.log(req.body)

    try {
        // const value = await schema.validateAsync({ name: req.body.name });

        const value = await schema.validateAsync(req.body);
        console.log("value", value)

    }
    catch (err) {
        console.log("err", err)
        res.status(500).send(err.details[0].message);

        return;
    }
    
    const course = {
        id: courses.id,
        name: req.body.name
    }
    
    courses.put(course)
    res.send(course);



});

app.listen(3000, () => console.log('listening to 3000'));
