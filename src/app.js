import "bootstrap";
import "./style.css";

function main() {
  const suits = ["♦", "♥", "♠", "♣"];
  const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

  const drawBtn = document.getElementById("drawBtn");
  const sortBtn = document.getElementById("sortBtn");
  const cardAmountInput = document.getElementById("cardAmount");
  const cardsContainer = document.querySelector(".cards");
  const logContainer = document.querySelector(".sort-log");

  let cardValuesToShow = [];

  function generateRandomCard() {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const value = values[Math.floor(Math.random() * values.length)];
    return { suit, value };
  }

  function getCardValue(val) {
    if (val === "J") return 11;
    if (val === "Q") return 12;
    if (val === "K") return 13;
    if (val === "A") return 14;
    return parseInt(val);
  }

  function createCard({ suit, value }) {
    const card = document.createElement("div");
    card.className = "card-box";

    const isRed = suit === "♥" || suit === "♦";
    const colorClass = isRed ? "red" : "black";

    card.innerHTML = `
      <div class="card-body ${colorClass}">
        <div class="top">${suit}</div>
        <div class="num">${value}</div>
        <div class="bottom">${suit}</div>
      </div>
    `;
    return card;
  }

  drawBtn.addEventListener("click", () => {
    const count = parseInt(cardAmountInput.value);
    cardsContainer.innerHTML = "";
    logContainer.innerHTML = "";
    cardValuesToShow = [];

    if (isNaN(count) || count <= 0) {
      alert("Please enter a valid number");
      return;
    }

    for (let i = 0; i < count; i++) {
      const cardData = generateRandomCard();
      cardValuesToShow.push(cardData);
      const cardElement = createCard(cardData);
      cardsContainer.appendChild(cardElement);
    }
  });

  sortBtn.addEventListener("click", () => {
    if (cardValuesToShow.length === 0) return;

    logContainer.innerHTML = "<h4>Bubble Sort Log:</h4>";

    let arr = [...cardValuesToShow];
    let n = arr.length;
    let step = 0;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (getCardValue(arr[j].value) > getCardValue(arr[j + 1].value)) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }

      // Log the result of this pass
      const stepRow = document.createElement("div");
      stepRow.className = "log-step";

      const label = document.createElement("div");
      label.className = "log-label";
      label.innerText = `${step++}`;

      const cardsRow = document.createElement("div");
      cardsRow.className = "log-cards";

      arr.forEach(card => {
        const cardEl = createCard(card);
        cardsRow.appendChild(cardEl);
      });

      stepRow.appendChild(label);
      stepRow.appendChild(cardsRow);
      logContainer.appendChild(stepRow);
    }
  });
}

main();
