module.exports 
info : {
const rp = require('request-promise');
const cheerios = require('cheerio');
const url = 'https://www.uniba.it/ricerca/dipartimenti/informatica';
const fs = require('fs');
const _ = require('lodash');
const isEqual = require('lodash/isEqual');
let scrape = [];

rp(url)
.then(function(html)
{
    const $ = cheerios.load(html);
    const text = $('#portletwrapper-706c6f6e652e6c656674636f6c756d6e0a636f6e746578740a2f756e696261342f726963657263612f646970617274696d656e74692f696e666f726d61746963610a646970617274696d656e746f2d64692d696e666f726d6174696361', html);
    links = $('a',text);
    $(links).each(function(i, link)
    {
        //temp object for saving
        let temp = new Object();
        
        temp.Title =$(link).text();
        temp.Link = $(link).attr('href');

        //push into scrape
        scrape.push(temp);
        if(!temp.Title || !temp.Link)
        {
            scrape.pop(temp);
        }
        if(_.isEqual(temp.Link, scrape[scrape.length - 2]))
        {
            scrape.pop(temp);

        }
        if(_.isEqual(temp.Title, "--  "))
        {
            scrape.pop(temp);

        }
        if(_.isEqual(temp.Title, "  "))
        {
            scrape.pop(temp);
        }
        
    })
    

    // remove \n from scrape object
    var jsonobj = JSON.stringify(scrape) 
    .replace(/\\n/g, '')
    .replace(/\n/g, '')
    .replace(/--/g, '');
    // convert json to object for formatting the json
    var redo = JSON.parse(jsonobj);
    //reconversion to json string
    var jsonfile = JSON.stringify(redo,null, "\t");
   // write file
    fs.writeFile('ultinfo.json', jsonfile, function (err)
    {
        if (err)
        {
         throw err;
        }

    })
})
}