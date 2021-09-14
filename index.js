const express = require('express');
//const cors = require('cors');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const app = express();
//app.use(cors());
const jsonParser = express.json();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('<h1>Dash like a hog</h1>' +
        '<h2>Backend part</h2>' +
    '<h3>Technology stack: Node.JS, Express, MongoDB</h3>')
})

const customerScheme = new Schema({name: String, phoneNumber: String, email: String}, {versionKey: false});
const Customer = mongoose.model("Customer", customerScheme);

const contractorScheme = new Schema({name: String, phoneNumber: String, email: String, rating: Number, specializationIds: [String]}, {versionKey: false});
const Contractor = mongoose.model("Contractor", contractorScheme);

const contractScheme = new Schema({customerId: String, contractorId: String, taskId: String}, {versionKey: false});
const Contract = mongoose.model("Contract", contractScheme);

const specializationScheme = new Schema({name: String, popularity: Number}, {versionKey: false});
const Specialization = mongoose.model("Specialization", specializationScheme);

const taskScheme = new Schema({specializationId: String, price: Number, currencyId: String, deadline: Date, description: String, photoUrl: [String]}, {versionKey: false});
const Task = mongoose.model("Task", taskScheme);

const currencyScheme = new Schema({name: String, currencyToUsd: Number}, {versionKey: false});
const Currency = mongoose.model("Currency", currencyScheme);


// -----------------------------------Customer CRUD-----------------------------------------------------
app.get("/api/customers", function(req, res){

    Customer.find({}, function(err, customers){

        if(err) return console.log(err);
        res.send(customers)
    });
});

app.get("/api/customers/:id", function(req, res){

    const id = req.params.id;
    Customer.findOne({_id: id}, function(err, customer){

        if(err) return console.log(err);
        res.send(customer);
    });
});

app.post("/api/customers", jsonParser, (req, res) => {

    if(!req.body) return res.sendStatus(400);

    const customerName = req.body.name;
    const customerPhoneNumber = req.body.phoneNumber ? req.body.phoneNumber : '';
    const customerEmail = req.body.email;
    const customer = new Customer({name: customerName, phoneNumber: customerPhoneNumber, email: customerEmail});

    customer.save(function(err){
        if(err) return console.log(err);
        res.send(customer);
    });
});

app.delete("/api/customers/:id", (req, res) => {

    const id = req.params.id;
    Customer.findByIdAndDelete(id, null, (err, customer) => {

        if(err) return console.log(err);
        res.send(customer);
    });
});

app.put("/api/customers", jsonParser, (req, res) => {

    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const customerName = req.body.name;
    const customerPhoneNumber = req.body.phoneNumber;
    const customerEmail = req.body.email;

    Customer.findOneAndUpdate({_id: id}, {name: customerName, phoneNumber: customerPhoneNumber, email: customerEmail}, {new: true}, (err, customer) => {
        if(err) return console.log(err);
        res.send(customer);
    });
});
// -------------------------------------------------------------------------------------------------------

// -----------------------------------Contractor CRUD-----------------------------------------------------
app.get("/api/contractors", function(req, res){

    Contractor.find({}, function(err, contractors){
        console.log('asked');
        if(err) return console.log(err);
        res.send(contractors)
    });
});

app.get("/api/contractors/:id", function(req, res){

    const id = req.params.id;
    Contractor.findOne({_id: id}, function(err, contractor){

        if(err) return console.log(err);
        res.send(contractor);
    });
});

app.post("/api/contractors", jsonParser, (req, res) => {

    if(!req.body) return res.sendStatus(400);

    const contractorName = req.body.name;
    const contractorPhoneNumber = req.body.phoneNumber ? req.body.phoneNumber : '';
    const contractorEmail = req.body.email;
    const contractorSpecializationIds = [...req.body.specializationIds];
    const contractor = new Contractor({name: contractorName, phoneNumber: contractorPhoneNumber, email: contractorEmail, rating: 0, specializationIds: contractorSpecializationIds });

    contractor.save(function(err){
        if(err) return console.log(err);
        res.send(contractor);
    });
});

app.delete("/api/contractors/:id", function(req, res){

    const id = req.params.id;
    Contractor.findByIdAndDelete(id, null, (err, contractor) => {

        if(err) return console.log(err);
        res.send(contractor);
    });
});

app.put("/api/contractors", jsonParser, function(req, res){

    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const contractorName = req.body.name;
    const contractorPhoneNumber = req.body.phoneNumber ? req.body.phoneNumber : '';
    const contractorEmail = req.body.email;
    const contractorSpecializationIds = [...req.body.specializationIds];

    Contractor.findOneAndUpdate({_id: id}, {name: contractorName, phoneNumber: contractorPhoneNumber, email: contractorEmail, rating: 0, specializationIds: contractorSpecializationIds }, {new: true}, (err, contractor) => {
        if(err) return console.log(err);
        res.send(contractor);
    });
});
// -----------------------------------------------------------------------------------------------------

// -----------------------------------Contract CRUD-----------------------------------------------------
app.get("/api/contracts", function(req, res){

    Contract.find({}, function(err, contracts){

        if(err) return console.log(err);
        res.send(contracts)
    });
});

app.get("/api/contracts/:id", function(req, res){

    const id = req.params.id;
    Contract.findOne({_id: id}, function(err, contract){

        if(err) return console.log(err);
        res.send(contract);
    });
});

app.post("/api/contracts", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);

    const contractCustomerId = req.body.customerId;
    const contractContractorId = req.body.contractorId;
    const contractTaskId = req.body.taskId;
    const contract = new Contract({customerId: contractCustomerId, contractorId: contractContractorId, taskId: contractTaskId});

    contract.save(function(err){
        if(err) return console.log(err);
        res.send(contract);
    });
});

app.delete("/api/contracts/:id", function(req, res){

    const id = req.params.id;
    Contract.findByIdAndDelete(id, null, (err, contract) => {

        if(err) return console.log(err);
        res.send(contract);
    });
});

app.put("/api/contracts", jsonParser, function(req, res){

    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const contractCustomerId = req.body.customerId;
    const contractContractorId = req.body.contractorId;
    const contractTaskId = req.body.taskId;

    Contract.findOneAndUpdate({_id: id}, {customerId: contractCustomerId, contractorId: contractContractorId, taskId: contractTaskId}, {new: true}, (err, contract) => {
        if(err) return console.log(err);
        res.send(contract);
    });
});
// -------------------------------------------------------------------------------------------------

// -----------------------------------Task CRUD-----------------------------------------------------
app.get("/api/tasks", function(req, res){

    Task.find({}, function(err, tasks){

        if(err) return console.log(err);
        res.send(tasks)
    });
});

app.get("/api/tasks/:id", function(req, res){

    const id = req.params.id;
    Task.findOne({_id: id}, function(err, task){

        if(err) return console.log(err);
        res.send(task);
    });
});

app.post("/api/tasks", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);

    const taskSpecializationId = req.body.specializationId;
    const taskPrice = req.body.price;
    const taskCurrencyId = req.body.currencyId;
    const taskDescription = req.body.description;
    const taskPhotoURLs = req.body.photoURL.length ? [...req.body.photoURL] : [];
    const taskDeadline = new Date(req.body.deadline);
    const task = new Task({specializationId: taskSpecializationId, price: taskPrice, currencyId: taskCurrencyId, deadline: taskDeadline, description: taskDescription, photoUrl: taskPhotoURLs});

    task.save(function(err){
        if(err) return console.log(err);
        res.send(task);
    });
});

app.delete("/api/tasks/:id", function(req, res){

    const id = req.params.id;
    Task.findByIdAndDelete(id, null, (err, task) => {

        if(err) return console.log(err);
        res.send(task);
    });
});

app.put("/api/tasks", jsonParser, function(req, res){

    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const taskSpecializationId = req.body.specializationId;
    const taskPrice = req.body.price;
    const taskCurrencyId = req.body.currencyId;
    const taskDescription = req.body.description;
    const taskPhotoURLs = [...req.body.photoURL];
    const taskDeadline = new Date(req.body.deadline);

    Task.findOneAndUpdate({_id: id}, {specializationId: taskSpecializationId, price: taskPrice, currencyId: taskCurrencyId, deadline: taskDeadline, description: taskDescription, photoUrl: taskPhotoURLs}, {new: true}, (err, task) => {
        if(err) return console.log(err);
        res.send(task);
    });
});
// -----------------------------------------------------------------------------------------------------------

// -----------------------------------Specialization CRUD-----------------------------------------------------
app.get("/api/specializations", function(req, res){

    Specialization.find({}, function(err, specializations){

        if(err) return console.log(err);
        res.send(specializations)
    });
});

app.get("/api/specializations/:id", function(req, res){

    const id = req.params.id;
    Specialization.findOne({_id: id}, function(err, specialization){

        if(err) return console.log(err);
        res.send(specialization);
    });
});

app.post("/api/specializations", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);

    const specializationName = req.body.name;
    const specializationPopularity = req.body.popularity;
    const specialization = new Specialization({name: specializationName, popularity: specializationPopularity});

    specialization.save(function(err){
        if(err) return console.log(err);
        res.send(specialization);
    });
});

app.delete("/api/specializations/:id", function(req, res){

    const id = req.params.id;
    Specialization.findByIdAndDelete(id, null, (err, specialization) => {

        if(err) return console.log(err);
        res.send(specialization);
    });
});

app.put("/api/specializations", jsonParser, function(req, res){

    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;const specializationName = req.body.name;
    const specializationPopularity = req.body.popularity;

    Specialization.findOneAndUpdate({_id: id}, {name: specializationName, popularity: specializationPopularity}, {new: true}, (err, specialization) => {
        if(err) return console.log(err);
        res.send(specialization);
    });
});
// -----------------------------------------------------------------------------------------------------

// -----------------------------------Currency CRUD-----------------------------------------------------
app.get("/api/currencies", function(req, res){

    Currency.find({}, function(err, currencies){

        if(err) return console.log(err);
        res.send(currencies)
    });
});

app.get("/api/currencies/:id", function(req, res){

    const id = req.params.id;
    Currency.findOne({_id: id}, function(err, currency){

        if(err) return console.log(err);
        res.send(currency);
    });
});

app.post("/api/currencies", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);

    const currencyName = req.body.name;
    const currencyToUsd = req.body.currencyToUsd;
    const currency = new Currency({name: currencyName, currencyToUsd: currencyToUsd});

    currency.save(function(err){
        if(err) return console.log(err);
        res.send(currency);
    });
});

app.delete("/api/currencies/:id", function(req, res){

    const id = req.params.id;
    Currency.findByIdAndDelete(id, null, (err, currency) => {

        if(err) return console.log(err);
        res.send(currency);
    });
});

app.put("/api/currencies", jsonParser, function(req, res){

    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;

    const currencyName = req.body.name;
    const currencyToUsd = req.body.currencyToUsd;

    Currency.findOneAndUpdate({_id: id}, {name: currencyName, currencyToUsd: currencyToUsd}, {new: true}, (err, currency) => {
        if(err) return console.log(err);
        res.send(currency);
    });
});
// --------------------------------------------------------------------------------------------------



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
