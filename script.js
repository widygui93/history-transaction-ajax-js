const viewButton = document.getElementsByTagName('button')[0];
viewButton.addEventListener('click', function() {
	const customer = document.getElementsByTagName('select')[0].value.toUpperCase();
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			displayHistoryTransFunc(this,customer);
		}
	};
	xhttp.open("GET", "cust.xml", true);
	xhttp.send();
});
const histTransDiv = document.getElementById("hist-trans");
function displayHistoryTransFunc(xml,cust){
	let idxSelectedCustomer;
	let xmlDoc = xml.responseXML;
	const name = xmlDoc.getElementsByTagName("NAME");
	const acctNo = xmlDoc.getElementsByTagName("ACCOUNTNO");
	for(let i = 0; i < name.length; i++){
		if(name[i].childNodes[0].nodeValue == cust){
			idxSelectedCustomer = i;
		}
	}
	histTransDiv.innerHTML = "";
	const pName = document.createElement("p"), pAcctNo = document.createElement("p");
	const nameTextNode = document.createTextNode("Customer Name: " + name[idxSelectedCustomer].childNodes[0].nodeValue);
	const acctNoTextNode = document.createTextNode(" Account No: " + acctNo[idxSelectedCustomer].childNodes[0].nodeValue);
	pName.appendChild(nameTextNode);
	pAcctNo.appendChild(acctNoTextNode);
	histTransDiv.appendChild(pName);
	histTransDiv.appendChild(pAcctNo);
	const historyTransactionTabel = document.createElement("table");
	histTransDiv.appendChild(historyTransactionTabel);
	let contentTable = "<tr><th>No</th><th>Date</th><th>INFO</th><th>DEBET/KREDIT</th><th>AMOUNT</th><th>BALANCE</th></tr>";
	const transaction = name[idxSelectedCustomer].parentNode.getElementsByTagName("TRANSACTION");
	for(let i = 0; i < transaction.length; i++){
		contentTable += "<tr><td>" + i + "</td><td>" + transaction[i].getElementsByTagName("DATE")[0].childNodes[0].nodeValue + "</td><td>" + transaction[i].getElementsByTagName("INFO")[0].childNodes[0].nodeValue + "</td><td>" +transaction[i].getElementsByTagName("DEBETKREDIT")[0].childNodes[0].nodeValue + "</td><td>" + transaction[i].getElementsByTagName("AMOUNT")[0].childNodes[0].nodeValue + "</td><td>" + transaction[i].getElementsByTagName("BALANCE")[0].childNodes[0].nodeValue + "</td></tr>";
	}
	document.getElementsByTagName("table")[0].innerHTML = contentTable;
}
const clearButton = document.getElementsByTagName('button')[1];
clearButton.addEventListener('click', function() {
	histTransDiv.innerHTML = "";
});