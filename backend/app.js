var express = require("express");
var app = express();
const { parse } = require('csv-parse');
const fs = require('fs');
const PORT = process.env.PORT || 3000;
const cors = require('cors');  // Import the cors package


app.use(cors());  // Enable CORS for all routes

const path = './dataIndia.csv';
//path
// [
//     "Airline",           0
//     "Date_of_Journey",   1
//     "Source",            2
//     "Destination",       3
//     "Route",             4
//     "Dep_Time",          5
//     "Arrival_Time",      6
//     "Duration",          7
//     "Total_Stops",       8
//     "Additional_Info",   9
//     "Price"              10
// ],
// Function to read and parse the CSV data
function readData(src, dst) {
  return new Promise((resolve, reject) => {
    let data = [];
    fs.createReadStream(path)
      .pipe(parse({ delimiter: ',', from_line: 1 }))
      .on('data', function (row) {
        // executed for each row of data
        
        const iata  = row[4].split(" ? ");
        if(iata[0] == src && iata[(iata.length) -1] == dst)
            data.push(iata);
      })
      .on('error', function (error) {
        // Handle the errors
        reject(error);
      })
      .on('end', function () {
        // executed when parsing is complete
        resolve(data);
      });
  });
}

// Route to handle GET request and return CSV data as JSON


app.get('/req/:query', async function (req, res) {
  try {
    from = req.params.query.split('-')[0];
    to = req.params.query.split('-')[1];
    let data = await readData(from, to);
    data = data.slice(1, 10);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error reading CSV file');
  }
});
app.listen(PORT);