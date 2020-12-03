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

function App() {
  return (
    <div>
      <h1>My first programming with a blockchain</h1>
      <div className="buttons">
        <button id="loginButton" onClick={this.loadBlockChain}>
          Connect to Metamask
        </button>
        <button id="transactionButton">
          Receive a token
        </button>
      </div>
    </div>
  );
}

export default App;
