const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const app = express();
app.use(cors());
const jsonParser = express.json();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('<h1>Dash like a hog</h1>' +
        '<h2>Backend part</h2>' +
    '<h3>Technology stack: Node.JS, Express, MongoDB</h3>')
})

const userScheme = new Schema({name: String, phoneNumber: String, email: String, rating: Number, roles: [String], specializationIds: [String]}, {versionKey: false});
const User = mongoose.model("User", userScheme);

const contractScheme = new Schema({customerId: String, contractorId: String, taskId: String}, {versionKey: false});
const Contract = mongoose.model("Contract", contractScheme);

const specializationScheme = new Schema({name: String, popularity: Number}, {versionKey: false});
const Specialization = mongoose.model("Specialization", specializationScheme);

const taskScheme = new Schema({specializationId: String, price: Number, currencyId: String, deadline: Date, description: String, photoUrl: [String]}, {versionKey: false});
const Task = mongoose.model("Task", taskScheme);

const currencyScheme = new Schema({name: String, currencyToUsd: Number}, {versionKey: false});
const Currency = mongoose.model("Currency", currencyScheme);



// -----------------------------------Users CRUD--------------------------------------------------------
{
    app.get("/api/users", function (req, res) {

        User.find({}, function (err, users) {
            if (err) return console.log(err);
            res.send(users)
        });
    });

    app.get("/api/users/:id", function (req, res) {

        const id = req.params.id;
        User.findOne({_id: id}, function (err, user) {

            if (err) return console.log(err);
            res.send(user);
        });
    });

    app.post("/api/users", jsonParser, (req, res) => {

        if (!req.body) return res.sendStatus(400);

        const userName = req.body.name;
        const userPhoneNumber = req.body.phoneNumber ? req.body.phoneNumber : '';
        const userEmail = req.body.email;
        const roles = [...req.body.roles];
        const userSpecializationIds = [...req.body.specializationIds];
        const user = new User({
            name: userName,
            phoneNumber: userPhoneNumber,
            email: userEmail,
            rating: 0,
            roles: [...roles],
            specializationIds: userSpecializationIds
        });

        user.save(function (err) {
            if (err) return console.log(err);
            res.send(user);
        });
    });

    app.delete("/api/users/:id", function (req, res) {

        const id = req.params.id;
        User.findByIdAndDelete(id, null, (err, user) => {

            if (err) return console.log(err);
            res.send(user);
        });
    });

    app.put("/api/users", jsonParser, function (req, res) {

        if (!req.body) return res.sendStatus(400);
        const id = req.body.id;
        const userName = req.body.name;
        const userPhoneNumber = req.body.phoneNumber ? req.body.phoneNumber : '';
        const userEmail = req.body.email;
        const userRoles = [...req.body.roles];
        const userSpecializationIds = [...req.body.specializationIds];
        User.findOneAndUpdate({_id: id}, {
            name: userName,
            phoneNumber: userPhoneNumber,
            email: userEmail,
            rating: 0,
            specializationIds: userSpecializationIds,
            roles: userRoles
        }, {new: true}, (err, user) => {
            if (err) return console.log(err);
            res.send(user);
        });
    });
// -----------------------------------------------------------------------------------------------------
}

// -----------------------------------Contract CRUD----------------------------------------------------------
{
    app.get("/api/contracts", function (req, res) {

        Contract.find({}, function (err, contracts) {


            if (err) return console.log(err);
            res.send(contracts)
        });
    });

    app.get("/api/contracts/:id", function (req, res) {

        const id = req.params.id;
        Contract.findOne({_id: id}, function (err, contract) {

            if (err) return console.log(err);
            res.send(contract);
        });
    });

    app.post("/api/contracts", jsonParser, function (req, res) {

        if (!req.body) return res.sendStatus(400);

        const contractCustomerId = req.body.customerId;
        const contractContractorId = req.body.contractorId;
        const contractTaskId = req.body.taskId;
        const contract = new Contract({
            customerId: contractCustomerId,
            contractorId: contractContractorId,
            taskId: contractTaskId
        });

        contract.save(function (err) {
            if (err) return console.log(err);
            res.send(contract);
        });
    });

    app.delete("/api/contracts/:id", function (req, res) {

        const id = req.params.id;
        Contract.findByIdAndDelete(id, null, (err, contract) => {

            if (err) return console.log(err);
            res.send(contract);
        });
    });

    app.put("/api/contracts", jsonParser, function (req, res) {

        if (!req.body) return res.sendStatus(400);
        const id = req.body.id;
        const contractCustomerId = req.body.customerId;
        const contractContractorId = req.body.contractorId;
        const contractTaskId = req.body.taskId;

        Contract.findOneAndUpdate({_id: id}, {
            customerId: contractCustomerId,
            contractorId: contractContractorId,
            taskId: contractTaskId
        }, {new: true}, (err, contract) => {
            if (err) return console.log(err);
            res.send(contract);
        });
    });

// -------------------------------------------------------------------------------------------------
}

// -----------------------------------Task CRUD--------------------------------------------------------------
{
    app.get("/api/tasks", function (req, res) {

        Task.find({}, function (err, tasks) {

            if (err) return console.log(err);
            res.send(tasks)
        });
    });

    app.get("/api/tasks/:id", function (req, res) {

        const id = req.params.id;
        Task.findOne({_id: id}, function (err, task) {

            if (err) return console.log(err);
            res.send(task);
        });
    });

    app.post("/api/tasks", jsonParser, function (req, res) {

        if (!req.body) return res.sendStatus(400);

        const taskSpecializationId = req.body.specializationId;
        const taskPrice = req.body.price;
        const taskCurrencyId = req.body.currencyId;
        const taskDescription = req.body.description;
        const taskPhotoURLs = req.body.photoURL.length ? [...req.body.photoURL] : [];
        const taskDeadline = new Date(req.body.deadline);
        const task = new Task({
            specializationId: taskSpecializationId,
            price: taskPrice,
            currencyId: taskCurrencyId,
            deadline: taskDeadline,
            description: taskDescription,
            photoUrl: taskPhotoURLs
        });

        task.save(function (err) {
            if (err) return console.log(err);
            res.send(task);
        });
    });

    app.delete("/api/tasks/:id", function (req, res) {

        const id = req.params.id;
        Task.findByIdAndDelete(id, null, (err, task) => {

            if (err) return console.log(err);
            res.send(task);
        });
    });

    app.put("/api/tasks", jsonParser, function (req, res) {

        if (!req.body) return res.sendStatus(400);
        const id = req.body.id;
        const taskSpecializationId = req.body.specializationId;
        const taskPrice = req.body.price;
        const taskCurrencyId = req.body.currencyId;
        const taskDescription = req.body.description;
        const taskPhotoURLs = [...req.body.photoURL];
        const taskDeadline = new Date(req.body.deadline);

        Task.findOneAndUpdate({_id: id}, {
            specializationId: taskSpecializationId,
            price: taskPrice,
            currencyId: taskCurrencyId,
            deadline: taskDeadline,
            description: taskDescription,
            photoUrl: taskPhotoURLs
        }, {new: true}, (err, task) => {
            if (err) return console.log(err);
            res.send(task);
        });
    });
// -----------------------------------------------------------------------------------------------------------
}

// -----------------------------------Specialization CRUD----------------------------------------------------
{
    app.get("/api/specializations", function (req, res) {

        Specialization.find({}, function (err, specializations) {

            if (err) return console.log(err);
            res.send(specializations)
        });
    });

    app.get("/api/specializations/:id", function (req, res) {

        const id = req.params.id;
        Specialization.findOne({_id: id}, function (err, specialization) {

            if (err) return console.log(err);
            res.send(specialization);
        });
    });

    app.post("/api/specializations", jsonParser, function (req, res) {

        if (!req.body) return res.sendStatus(400);

        const specializationName = req.body.name;
        const specializationPopularity = req.body.popularity;
        const specialization = new Specialization({name: specializationName, popularity: specializationPopularity});

        specialization.save(function (err) {
            if (err) return console.log(err);
            res.send(specialization);
        });
    });

    app.delete("/api/specializations/:id", function (req, res) {

        const id = req.params.id;
        Specialization.findByIdAndDelete(id, null, (err, specialization) => {

            if (err) return console.log(err);
            res.send(specialization);
        });
    });

    app.put("/api/specializations", jsonParser, function (req, res) {

        if (!req.body) return res.sendStatus(400);
        const id = req.body.id;
        const specializationName = req.body.name;
        const specializationPopularity = req.body.popularity;

        Specialization.findOneAndUpdate({_id: id}, {
            name: specializationName,
            popularity: specializationPopularity
        }, {new: true}, (err, specialization) => {
            if (err) return console.log(err);
            res.send(specialization);
        });
    });
// -----------------------------------------------------------------------------------------------------
}

// -----------------------------------Currency CRUD----------------------------------------------------------
{
    app.get("/api/currencies", function (req, res) {

        Currency.find({}, function (err, currencies) {

            if (err) return console.log(err);
            res.send(currencies)
        });
    });

    app.get("/api/currencies/:id", function (req, res) {

        const id = req.params.id;
        Currency.findOne({_id: id}, function (err, currency) {

            if (err) return console.log(err);
            res.send(currency);
        });
    });

    app.post("/api/currencies", jsonParser, function (req, res) {

        if (!req.body) return res.sendStatus(400);

        const currencyName = req.body.name;
        const currencyToUsd = req.body.currencyToUsd;
        const currency = new Currency({name: currencyName, currencyToUsd: currencyToUsd});

        currency.save(function (err) {
            if (err) return console.log(err);
            res.send(currency);
        });
    });

    app.delete("/api/currencies/:id", function (req, res) {

        const id = req.params.id;
        Currency.findByIdAndDelete(id, null, (err, currency) => {

            if (err) return console.log(err);
            res.send(currency);
        });
    });

    app.put("/api/currencies", jsonParser, function (req, res) {

        if (!req.body) return res.sendStatus(400);
        const id = req.body.id;

        const currencyName = req.body.name;
        const currencyToUsd = req.body.currencyToUsd;

        Currency.findOneAndUpdate({_id: id}, {
            name: currencyName,
            currencyToUsd: currencyToUsd
        }, {new: true}, (err, currency) => {
            if (err) return console.log(err);
            res.send(currency);
        });
    });
// --------------------------------------------------------------------------------------------------
}



async function start ()  {
    try {
        await mongoose.connect('mongodb+srv://Admin1:0649andrey@cluster0.q8zh3.mongodb.net/Dash_like_a_hog', {
            useNewUrlParser: true
        })
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        })
    }
    catch (e){
        console.log(e)
    }
}

start();
