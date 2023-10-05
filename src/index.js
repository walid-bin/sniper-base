const { Web3Ins } = require("./webThree");

const key = process.env.PRIVATE_KEY;
const webThree = new Web3Ins(key);

// webThree.getBalanceOf("0x172F7E333a2B812DfD499eFD0E390736dCaa114B").then(res => res)

const cont = webThree.getContract();

cont.events.allEvents({}, () => { }).on('data', async (data) => {
    // webThree.getBalanceOf(data.returnValues.trader).then(res => console.log(webThree.web3.utils.fromWei(res, 'ether'), data.returnValues.isBuy, data.returnValues.ethAmount, data.transactionHash));
    const response = {
        isBuy: data.returnValues.isBuy,
        transactionHash: data.transactionHash,
        ref: data.returnValues.subject,
        trader: data.returnValues.trader,
    };
    const resp = await webThree.web3.eth.getTransaction(data.transactionHash);
    response.value = resp.value;
    console.log(response);
    /* 
    the respnse contains the refer address and trader address, and also have transection hash and the caller of the event is buy or not. 
    now you have to decide the action
    */
});