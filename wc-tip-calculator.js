class TipCalculator extends HTMLElement {
    constructor() {
        super();

        // Attach a shadow DOM tree to this instance
        const shadow = this.attachShadow({mode: 'open'});

        // Create elements
        const wrapper = document.createElement('div');
        const style = document.createElement('style');
        const title = document.createElement('h2');
        const subtitle = document.createElement('h3');
        const billInput = document.createElement('input');
        const tipInput = document.createElement('input');
        const calculateButton = document.createElement('button');
        const totalTip = document.createElement('p');
        const totalBill = document.createElement('p');

        // Set up the elements
        wrapper.setAttribute('class', 'calculator');

        title.textContent = "Tip Calculator";
        subtitle.textContent = "Web Component"

        billInput.setAttribute('type', 'number');
        billInput.setAttribute('placeholder', 'Enter Bill Amount');
        billInput.id = 'billAmount';

        tipInput.setAttribute('type', 'number');
        tipInput.setAttribute('placeholder', 'Enter Tip Percentage');
        tipInput.id = 'tipPercentage';

        calculateButton.textContent = 'Calculate Tip';
        calculateButton.onclick = () => this.calculateTip();

        totalTip.id = 'totalTip';
        totalTip.textContent = 'Total Tip: $0.00';

        totalBill.id = 'totalBill';
        totalBill.textContent = 'Total Bill: $0.00';

        // Apply external styles
        style.textContent = `
            h2 {
                color: darkblue;
                margin: 0;
            }
            h3 {
                color: darkblue;
                opacity: .5;
                font-size: 12px;
            }
            .calculator {
                font-family: Arial, sans-serif;
                background: lightgray;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            input[type="number"] {
                width: 100%;
                padding: 10px;
                margin: 10px 0;
                border-radius: 4px;
                border: 1px solid #ddd;
            }
            button {
                width: 100%;
                padding: 10px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            button:hover {
                background-color: #0056b3;
            }
        `;

        // Append elements to the shadow DOM
        shadow.appendChild(style);
        wrapper.appendChild(title);
        wrapper.appendChild(subtitle);
        wrapper.appendChild(billInput);
        wrapper.appendChild(tipInput);
        wrapper.appendChild(calculateButton);
        wrapper.appendChild(totalTip);
        wrapper.appendChild(totalBill);
        shadow.appendChild(wrapper);
    }

    calculateTip() {
        const billAmount = this.shadowRoot.getElementById('billAmount').value;
        const tipPercentage = this.shadowRoot.getElementById('tipPercentage').value;

        const tipAmount = billAmount * (tipPercentage / 100);
        const totalBill = parseFloat(billAmount) + tipAmount;

        this.shadowRoot.getElementById('totalTip').textContent = 'Total Tip: $' + tipAmount.toFixed(2);
        this.shadowRoot.getElementById('totalBill').textContent = 'Total Bill: $' + totalBill.toFixed(2);
    }
}

// Define the new element
customElements.define('tip-calculator', TipCalculator);
