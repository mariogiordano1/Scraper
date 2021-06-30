# Scraper
**Cos'è Scraper**

Questa applicazione è lo scraper che DIBot sfrutta per ottenere le informazioni direttamente dal sito del Dipartimento di Informatica di Bari
****
**Strumenti Utilizzati**

Lo scraper è stato sviluppato utilizzando il framework Runtime di JavaScript Node.js, facendo utilizzo delle librerie Request-Promise, Request per ottenere l'html del sito web tramite metodo GET, Cheerio per effettuare l'operazione di scraping sull'HTML ottenuto dal sito, e Node-Schedule per ripetere l'operazione di scraping in intervalli temporali regolari. 
Visual Studio Code con estensione Node.Js è stato utilizzato per la stesura del codice, testing e debugging. Per il controllo di versione è stato utilizzato Git con repository remota su GitHub (https://github.com/mariogiordano1/Scraper). npm è stato utilizzato per la gestione delle librerie Node.js. MongoDB è il database utilizzato per salvare i dati ottenuti dall'operazione di scraping. Per il deployment è stato utilizzato Docker, e l'applicazione è stata inserita all'interno di un Container.
****
**Come funziona**

L'applicazione richiede tramite metodo GET l'HTML del sito. Dall'HTML, sfruttando la libreria cheerio, vengono estratte le parti di interesse del sito attraverso i tag HTML.
Una volta estratte le informazioni dall'HTML, esse vengono salvate all'interno di un array di oggetti JavaScript e tramite delle espressioni regolari questi oggetti vengono ripuliti da spaziature in eccesso e errori derivanti dall'HTML. Successivamente l'array di oggetti JavaScript viene parsato a Stringa JSON (JavaScript Object Notation) e viene scritto su un file .json. Una volta estratte tutte le informazioni di interesse dall'HTML, l'applicazione si connette al cluster di MongoDB dove è hostato il database, è tutti i file JSON vengono caricati nelle rispettive collezioni all'interno del database. Sfruttando la libreria node-schedule, questa operazione viene eseguita ogni giorno alle 4 A.M.
****
