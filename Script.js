module.exports
main : {
const didattica = require('./didattica.js');
const info = require('./ultinfo');
const notizie = require('./notizie');
const primopiano = require('./primopiano');
const contatti = require('./contatti');
const eventi = require('./eventi');
const job = require('./job');
const fs = require('fs');



didattica.didattica;
console.log('executed Didattica');
info.info;
console.log('executed Info');
notizie.notizie;
console.log('executed Notizie');
primopiano.primopiano;
console.log('executed Primopiano');
contatti.contatti;
console.log('executed Contatti');
eventi.eventi;
console.log('executed Eventi');
job.job;
console.log('executed Job');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Portekino:Teletubbini@cluster0.wptqr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


client.connect(async err => {
  console.log('connection Enstablished');
  
  if (err)
  {
    console.log('Error in connection:' + err);
    
  }
  //log into DB
  const db = client.db("Unibabottone");
  // perform actions on the collection object
  //Contatti
  var collection = db.collection("Contatti");
  await collection.drop();
  console.log('contatti dropped');
  let contacts = await JSON.parse(fs.readFileSync('contatti.json'));
  await collection.insertMany(contacts);
  console.log('contatti inserted');
  var collection = client.db("Unibabottone").collection("Contatti");
  // Didattica
  collection = db.collection("Didattica");
  await collection.drop();
  console.log('didattica dropped');
  let didat = await JSON.parse(fs.readFileSync('didattica.json'));
  await collection.insertMany(didat);
  console.log('didattica inserted');
  //Ultinfo
  collection = db.collection("Ultinfo");
  await collection.drop();
  console.log('ultinfo dropped');
  let ultinf = await JSON.parse(fs.readFileSync('ultinfo.json'));
  await collection.insertMany(ultinf);
  console.log('ultinfo inserted');
  //Eventi
  collection = db.collection("Eventi");
  await collection.drop();
  console.log('eventi dropped');
  let events = await JSON.parse(fs.readFileSync('eventi.json'));
  await collection.insertMany(events);
  console.log('eventi inserted');
  // Notizie
  collection = db.collection("Notizie");
  await collection.drop();
  console.log('notizie dropped');
  let news = await JSON.parse(fs.readFileSync('notizie.json'));
  await collection.insertMany(news);
  console.log('notizie inserted');
  //Job
  collection = db.collection("Job");
  await collection.drop();
  console.log('job dropped');
  let jobs = await JSON.parse(fs.readFileSync('job.json'));
  await collection.insertMany(jobs);
  console.log('job inserted');
  // Primo Piano
  collection = db.collection("Primo Piano");
  await collection.drop();
  console.log('Primo piano dropped');
  let dashb = await JSON.parse(fs.readFileSync('primopiano.json'));
  await collection.insertMany(dashb);
  console.log('primopiano inserted');
  console.log('Completed Insertion of all components in Database');

  client.close();
});
}
