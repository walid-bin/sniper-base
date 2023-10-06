const { Web3Ins } = require("./webThree");
const shareRange = require("../shareRange.json");
const key = process.env.PRIVATE_KEY;
const webThree = new Web3Ins(key);


const limit = Number(process.env.LIMIT);
const cont = webThree.getContract();

cont.events.Trade({}, () => { }).on('data', async (data) => {
    const response = {
        isBuy: data.returnValues.isBuy,
        transactionHash: data.transactionHash,
        ref: data.returnValues.subject,
        trader: data.returnValues.trader,
    };
    const balanceOf = await webThree.getBalanceOf(data.returnValues.trader);
    const resp = await webThree.web3.eth.getTransaction(data.transactionHash);
    response.value = webThree.web3.utils.fromWei(resp.value, 'ether');
    response.balanceOf = webThree.web3.utils.fromWei(balanceOf, 'ether');


    // console.log(response.transactionHash, response.balanceOf);

    /*
     this is the logic to find the share count of the buy order action 
    console.log(shareRange.find((range) => ((Number(range.min) < Number(response.balanceOf)) && (Number(range.max) > Number(response.balanceOf)))), response.balanceOf);
 */

});