module.exports
contatti:
{
const rp = require('request-promise');
const cheerios = require('cheerio');
const url = 'https://www.uniba.it/ricerca/dipartimenti/informatica';
const fs = require('fs');
const _ = require('lodash');
const isEqual = require('lodash/isEqual');
let scrape = [];

rp(url)
.then(async function(html)
{
    const $ = cheerios.load(html);
    const text = $('#portletwrapper-706c6f6e652e7269676874636f6c756d6e0a636f6e746578740a2f756e696261342f726963657263612f646970617274696d656e74692f696e666f726d61746963612f646970617274696d656e746f2d64692d696e666f726d61746963610a7370617a696f2d73747564656e7469', html);
    links = $('a',text);
    $(links).each(async function(i, link)
    {
        //temp object for saving
        let temp = new Object();
        temp.Title =$(link).text();
        temp.Link = $(link).attr('href');
        scrape.push(temp);
        if(!temp.Title || !temp.Link)
        {
            await scrape.pop(temp);
        }
        if(_.isEqual(temp, scrape[scrape.length - 2]))
        {
            await scrape.pop(temp);

        }

        //push into scrape
        
    })

    // remove \n from scrape object
    var jsonobj =  JSON.stringify(scrape) 
    .replace(/\\n/g, '')
    .replace(/\n/g, '')
    .replace(/""/g, '')
    // convert json to object for formatting the json
    var redo = JSON.parse(jsonobj);
    //reconversion to json string
    var jsonfile = JSON.stringify(redo,null, "\t");
   // write file
    fs.writeFileSync('contatti.json', jsonfile, function (err)
    {
        if (err)
        {
         throw err;
        }

    })

})
}
