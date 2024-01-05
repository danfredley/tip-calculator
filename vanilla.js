function calculateTip() {
    var billAmount = document.getElementById('billAmount').value;
    var tipPercentage = document.getElementById('tipPercentage').value;

    var tipAmount = billAmount * (tipPercentage / 100);
    var totalBill = parseFloat(billAmount) + tipAmount;

    document.getElementById('totalTip').innerHTML = 'Total Tip: $' + tipAmount.toFixed(2);
    document.getElementById('totalBill').innerHTML = 'Total Bill: $' + totalBill.toFixed(2);
}