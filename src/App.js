import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import './index.css';

class App extends React.Component{
  constructor(props){
    super(props);

    // Sets up the values we will assign from Metamask connection
    this.state = {
      account: null,
      network: null,
    };
    // Allows reference to this.loadBlockChain
    this.loadBlockChain = this.loadBlockChain.bind(this);
  }

  async loadBlockChain() {
    // Load in Web3 Connection
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:3000')

    // Get data from Metamask
    const userNetwork = await web3.eth.net.getNetworkType();
    const accounts = await web3.eth.getAccounts()

    // Update state with Metamask info
    this.setState({network: userNetwork})
    this.setState({account: accounts[0]})

    console.log("Connected to Metamask");
    console.log("Account is: " + this.state.account);
  }

  onClickTransaction = () => {
    // Adventure API address
    const APIaddress =  "http://13.56.163.182:8000/transfer-token";

    console.log("transaction to: " + this.state.account);

    // Access API for transaction

    fetch(APIaddress, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ticker: "HOTPOTATO",
        amount: 1,
        to: this.state.account,
        hookUrl: "test",
      }),
    })
    .then(function (response){
        console.log(response)
    })
    .catch(function (error){
        console.log(error)
    });
  }

  render() {
    return (
      <div>
        <h1>My first programming with a blockchain</h1>
        <div className="buttons">
          <button id="loginButton" onClick={this.loadBlockChain}>
            Connect to Metamask
          </button>
          <button id="transactionButton" onClick={this.onClickTransaction}>
            Receive a token
          </button>
        </div>
        <div>
          <p>
            Your account: {this.state.account}
            <br></br>
            Network: {this.state.network}
          </p>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);

export default App;
