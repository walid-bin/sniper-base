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
}

module.exports = { Web3Ins };