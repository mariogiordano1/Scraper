const schedule = require('node-schedule');
const Script = require('./Script.js');

const job = schedule.scheduleJob('*/30 * * * *', function(err){
  
    if(err)
  {
      console.log('Error' + err);
  }
  Script.main;
});
