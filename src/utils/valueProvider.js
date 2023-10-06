const shareRange = require("../../shareRange.json");
const { shareList } = require('../shareList');

function valueProvider(balance) {
  const targetRange = shareRange.find((range) => ((Number(range.min) < Number(balance)) && (Number(range.max) > Number(balance))));
  if (!targetRange) return 0;
  const values = shareList.find((ech) => (Number(ech.shares) === Number(targetRange.share)));
  if (!values) return 0;
  return values;
}

module.exports = {
  valueProvider
}