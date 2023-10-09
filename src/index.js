const { valueProvider } = require("./utils/valueProvider");
const { Web3Ins } = require("./webThree");

const key = process.env.PRIVATE_KEY;
const webThree = new Web3Ins(key);


let limit = Number(process.env.LIMIT);
const cont = webThree.getContract();

cont.events.Trade({}, () => {
}).on('data', async (data) => {
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

    const shouldTrade = (response.isBuy && (response.trader === response.ref) && (Number(response.value) === 0));
    if (!shouldTrade) return console.log("[+] = Not snipeable trade");;
    console.log("[+] = New snipable trade occure");
    const values = valueProvider(response.balanceOf);
    if (!values || !((limit -= Number(values.buyPrice)) >= 0)) return console.log("[+] = Something wrong with values or limit");
    const buy = await webThree.buyShares({ ...values, trader: response.trader });
    if (!buy) {
        limit += Number(values.buyPrice);
        return console.log("[+] = filed to buy");
    };
    console.log({ BuyResponse: buy });
});