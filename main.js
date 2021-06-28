const schedule = require('node-schedule');
const Script = require('./Script.js');

const job = schedule.scheduleJob('0 4 * * *', function(err){
  
    if(err)
  {
      console.log('Error' + err);
  }
  Script.main;
});