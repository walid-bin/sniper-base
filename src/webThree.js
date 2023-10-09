const env = require('dotenv');
const contractABI = require('./ABI/friendABI.json');
const { Web3, WebSocketProvider } = require('web3');
env.config();

let providerOrUrl = process.env.PROVIDER_URL;
let friendContract = process.env.FRIEND_CONTRACT;

class Web3Ins {
  constructor(privateKey) {
    this.web3 = new Web3(new WebSocketProvider(providerOrUrl));
    this.wallet = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    this.contract = new this.web3.eth.Contract(contractABI, friendContract);
  }
  getContract() {
    return this.contract;
  }

  async getBalanceOf(address) {
    const balance = await this.web3.eth.getBalance(address);
    return balance;
  }

  async buyShares(values) {
    try {
      console.log("[+] = Trigger snipe");
      const balns = this.web3.utils.toWei(Number(values.buyPrice) + (Number(values.buyPrice) * .10), 'ether');
      const block = await this.web3.eth.getBlock('latest');
      const resp = await this.contract.methods.buyShares(
        values.trader,
        values.shares,
      ).send({ from: this.wallet.address, maxFeePerGas: (Number(block.baseFeePerGas.toString()) * 1.251).toFixed(0).toString(), value: balns });
      if (!resp) return 0;
      return resp;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = { Web3Ins };