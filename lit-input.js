import { LitElement, html, css } from "https://unpkg.com/lit@2?module";

class LitInput extends LitElement {
  static get styles() {
    return css`
      .input-container {
        position: relative;
        margin-bottom: 15px;
        font-size: 12px;
      }
      label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }
      input {
        width: 100%;
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #ddd;
      }
      .reset-button {
        position: absolute;
        bottom: 5px;
        right: 5px;
        background: transparent;
        border: none;
        cursor: pointer;
        font-size: 16px;
      }
    `;
  }

  static get properties() {
    return {
      type: { type: String },
      placeholder: { type: String },
      value: { type: Number },
      label: { type: String },
      maxWidth: { type: String },
      minWidth: { type: String },
    };
  }

  constructor() {
    super();
    this.type = "text";
    this.placeholder = "";
    this.value = 0;
    this.label = "";
    this.maxWidth = "90%";
    this.minWidth = "10%";
  }

  render() {
    // Check if the value is 0 and treat it as an empty string for display purposes
    let displayValue = this.value === 0 ? "" : this.value;

    return html`
      <div
        class="input-container"
        style="max-width: ${this.maxWidth}; min-width: ${this.minWidth};"
      >
        ${this.label ? html`<label>${this.label}</label>` : null}
        <input
          type="${this.type}"
          placeholder="${this.placeholder}"
          .value="${displayValue}"
          @input="${this.handleInput}"
          @change="${this.handleChange}"
        />
        <button class="reset-button" @click="${this.resetValue}">
          &#x21BA;
        </button>
      </div>
    `;
  }
  resetValue() {
    this.value = 0;
    this.dispatchEvent(
      new CustomEvent("value-changed", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  handleChange(event) {
    // Update the value only if it's a valid number, otherwise reset to empty
    this.value = event.target.value ? Number(event.target.value) : "";
    this.dispatchEvent(
      new CustomEvent("value-changed", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  handleInput(event) {
    this.value = event.target.value;
    this.dispatchEvent(
      new CustomEvent("value-changed", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("lit-input", LitInput);
