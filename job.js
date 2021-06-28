module.exports 
job : {
const rp = require('request-promise');
const cheerios = require('cheerio');
const url = 'https://www.uniba.it/ricerca/dipartimenti/informatica';
const fs = require('fs');
let scrape = [];

rp(url)
.then(function(html)
{
    const $ = cheerios.load(html);
    const text = $('#portletwrapper-436f6e74656e7457656c6c506f72746c6574732e42656c6f77506f72746c65744d616e61676572310a636f6e746578740a2f756e696261342f726963657263612f646970617274696d656e74692f696e666f726d61746963612f646970617274696d656e746f2d64692d696e666f726d61746963610a6a6f622d706c6163656d656e74', html);
    links = $('a',text);
    $(links).each(function(i, link)
    {
        //temp object for saving
        let temp = new Object();
        temp.Title =$(link).text();
        temp.Link = $(link).attr('href');
        //push into scrape
        scrape.push(temp);
    })

    // remove \n from scrape object
    var jsonobj = JSON.stringify(scrape) 
    .replace(/\\n/g, '')
    .replace(/\n/g, '')
    // convert json to object for formatting the json
    var redo = JSON.parse(jsonobj);
    //reconversion to json string
    var jsonfile = JSON.stringify(redo,null, "\t");
   // write file
    fs.writeFile('job.json', jsonfile, function (err)
    {
        if (err)
        {
         throw err;
        }

    })
})
}