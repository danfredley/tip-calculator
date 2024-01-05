import "./lit-input.js";
import { LitElement, html, css } from "https://unpkg.com/lit@2?module";

class LitTipCalculator extends LitElement {
  static get styles() {
    return css`
      .calculator {
        font-family: Arial, sans-serif;
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        position: relative;
      }
      input[type="number"] {
        width: 100%;
        padding: 10px;
        margin: 10px 0;
        border-radius: 4px;
        border: 1px solid #ddd;
      }
      h2 {
        margin: 0;
      }
      h3 {
        opacity: 0.5;
        font-size: 12px;
        margin: 0 0 10 0;
        margin-block-start: 0;
      }
      .calculator button:not(.reset-calculator-button) {
        width: 100%;
        padding: 10px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      .calculator button:not(.reset-calculator-button):hover {
        background-color: #0056b3;
      }
      .reset-calculator-button {
        color: black;
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: transparent;
        border: 1px solid #ddd;
        border-radius: 5px;
        cursor: pointer;
        padding: 5px 10px;
        font-size: 16px;
      }
      .history-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }
      .history-table th,
      .history-table td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      .history-table th {
        background-color: #f2f2f2;
      }
    `;
  }

  static get properties() {
    return {
      billAmount: { type: Number },
      tipPercentage: { type: Number },
      totalTip: { type: Number },
      totalBill: { type: Number },
      history: { type: Array },
    };
  }

  constructor() {
    super();
    this.billAmount = 0;
    this.tipPercentage = 0;
    this.totalTip = 0;
    this.totalBill = 0;
    this.history =
      JSON.parse(localStorage.getItem("tipCalculatorHistory")) || []; // Initialize the history array
  }

  calculateTip() {
    // Convert input values to numbers and ensure they are valid
    const bill = Number(this.billAmount);
    const tipPercent = Number(this.tipPercentage);

    if (!isNaN(bill) && !isNaN(tipPercent)) {
      this.totalTip = bill * (tipPercent / 100);
      this.totalBill = bill + this.totalTip;
    } else {
      this.totalTip = 0;
      this.totalBill = 0;
    }

    // Add to history and update localStorage
    const newEntry = {
      billAmount: this.billAmount,
      tipPercentage: this.tipPercentage,
      totalTip: this.totalTip,
      totalBill: this.totalBill,
    };
    this.history = [...this.history, newEntry];
    localStorage.setItem("tipCalculatorHistory", JSON.stringify(this.history));

    this.requestUpdate();
  }
  resetCalculator() {
    this.billAmount = 0;
    this.tipPercentage = 0;
    this.totalTip = 0;
    this.totalBill = 0;
  }

  render() {
    return html`
      <div class="calculator">
        <h2>Tip Calculator</h2>
        <h3>Lit Component</h3>
        <lit-input
          label="Bill Amount:"
          type="number"
          placeholder="Enter Bill Amount"
          .value="${this.billAmount}"
          @value-changed="${(e) => (this.billAmount = Number(e.detail.value))}"
        >
        </lit-input>
        <lit-input
          label="Tip Percentage:"
          type="number"
          placeholder="Enter Tip Percentage"
          .value="${this.tipPercentage}"
          @value-changed="${(e) =>
            (this.tipPercentage = Number(e.detail.value))}"
        >
        </lit-input>
        <button @click="${this.calculateTip}">Calculate Tip</button>
        <p>Total Tip: $${this.totalTip.toFixed(2)}</p>
        <p>Total Bill: $${this.totalBill.toFixed(2)}</p>
        <button class="reset-calculator-button" @click="${
          this.resetCalculator
        }">
        &#x21BA
        </button>
        <!-- History Table -->
        <table class="history-table">
                    <thead>
                        <tr>
                            <th>Bill Amount</th>
                            <th>Tip Percentage</th>
                            <th>Total Tip</th>
                            <th>Total Bill</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.history.map(
                          (entry) => html`
                            <tr>
                              <td>$${entry.billAmount.toFixed(2)}</td>
                              <td>${entry.tipPercentage}%</td>
                              <td>$${entry.totalTip.toFixed(2)}</td>
                              <td>$${entry.totalBill.toFixed(2)}</td>
                            </tr>
                          `
                        )}
                    </tbody>
                </table>
      </div>
    `;
  }
}

customElements.define("lit-input-tip-calculator", LitTipCalculator);
