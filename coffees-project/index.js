const fs = require('fs');
const csvFilePath='./coffees.csv';
const csv=require('csvtojson')
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    console.log(jsonObj);
    fs.writeFile("coffees.json", JSON.stringify(jsonObj), 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
    });
})