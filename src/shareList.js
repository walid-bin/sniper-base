const fs = require('fs');
const { parse } = require('csv');
const dataArray = [];
const csvFilePath = `${process.cwd()}/src/shareList.csv`;

fs.createReadStream(csvFilePath)
  .pipe(parse())
  .on('data', (row) => {
    const [shares, sum1, sum2, summation, priceInwei, buyPrice, sellPrice] = row;
    if (shares !== 'Shares') {
      dataArray.push({ shares, buyPrice });
    }
  })
  .on('error', (error) => {
    console.error('Error:', error.message);
  });

module.exports = { shareList: dataArray }