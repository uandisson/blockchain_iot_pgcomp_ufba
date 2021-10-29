if (window.ethereum) {
	window.web3 = new Web3(window.ethereum)
	try {
		ethereum.enable()
	} catch (error) {
		console.log('user rejected permission')
	}
} else if (window.web3) {
	window.web3 = new Web3(window.web3.currentProvider)
} else {
	window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
}
console.log(window.web3.currentProvider)

var contractAddress = '0xDa42446...8cffa6c';

var abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "device",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "instruction",
				"type": "string"
			}
		],
		"name": "Instruction",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "device",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "instruction",
				"type": "string"
			}
		],
		"name": "reward",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "temp",
				"type": "uint256"
			}
		],
		"name": "atualizaTemperatura",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_sensor",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "reg",
				"type": "address"
			}
		],
		"name": "IoT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getIoT",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTemperatura",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "temperatura",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

var abi_json = JSON.parse(JSON.stringify(abi));
contract = new web3.eth.Contract(abi_json, contractAddress);

var account;

web3.eth.getAccounts(function (err, accounts) {
	if (err != null) {
		alert("Error retrieving accounts.");
		return;
	}
	if (accounts.length == 0) {
		alert("No account found! Make sure the Ethereum client is configured properly.");
		return;
	}
	account = accounts[0];
	console.log('Account: ' + account);
	web3.eth.defaultAccount = account;
});

function registerSetAddressIot() {
	sensor = $("#newInfoAddressSensor").val();
	console.log("Sensor: ", sensor);
	term = $("#newInfoAddressTerm").val();
	console.log("Termostato: ", term);

	contract.methods.IoT(sensor, term).send({ from: account }).then(function (tx) {
		console.log("Transaction: ", tx);
	});
	$("#newInfoAddress").val('');
}

function registerGetAddressIot() {
	contract.methods.getIoT().call().then(function (info) {
		console.log("info: ", info);
		document.getElementById('lastInfoAddressIot').innerHTML = "Sensor: " + info[0] + ", Termostato: " + info[1];
	});
}

function registerSetTemp() {
	temp = $("#newInfoTemp").val();
	contract.methods.atualizaTemperatura(temp).send({ from: account }).then(function (tx) {
		console.log("Transaction: ", tx);
	});
	$("#newInfoTemp").val('');
}

function registerGetTemp() {
	contract.methods.getTemperatura().call().then(function (info) {
		console.log("info: ", info);
		document.getElementById('lastInfoTemp').innerHTML = info;
	});
}

