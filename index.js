//import csv parsing output library
const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


//create CSV writer to generate the header column when it is time
//to write to the csv
const csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
    {id: 'multiplied_result', title: 'Multiplied_Result'},
  ]
});

//read and parse the csv
let data = []
fs.createReadStream('zips.csv')
  .pipe(csv())
  .on('data', (row) => {
    //multiply the zipcode by rate_area
    let result = row.zipcode * row.rate_area
    data.push({multiplied_result: result})
    
  })
  .on('end', () => {
    // write to the csv in on block so that data is computed first and then the result
    // is written to the csv file
    csvWriter
      .writeRecords(data)
      .then(()=> console.log('The CSV file was written successfully'));
    console.log('CSV file successfully processed');
  });