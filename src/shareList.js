const fs = require('fs');
const { parse } = require('csv');
const dataArray = [];
const csvFilePath = `${process.cwd()}/src/shareList.csv`;

fs.createReadStream(csvFilePath)
  .pipe(parse())
  .on('data', (row) => {
    if (row[0] !== 'Shares') {
      dataArray.push({ shares: row[0], buyPrice: row[5] });
    }
  })
  .on('error', (error) => {
    console.error('Error:', error.message);
  });

module.exports = { shareList: dataArray }