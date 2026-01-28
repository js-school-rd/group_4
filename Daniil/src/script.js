let currentBudget = 20000;
let paymentsHistory = [];

const input = document.getElementById("calc_input");
const currentBudgetElement = document.querySelector(".calc_budget");
const categoriesContainer = document.querySelector(".calc_categories");
const historyContainer = document.querySelector(".calc_history");
const categories = [
  { id: 0, name: "Food", icon: "assets/food-svgrepo-com.svg" },
  { id: 1, name: "Fun", icon: "assets/party-horn-svgrepo-com.svg" },
  { id: 2, name: "Housing", icon: "assets/home-svgrepo-com.svg" },
  {
    id: 3,
    name: "Drinks",
    icon: "assets/drinks-holiday-sea-sky-travel-vacation-2-svgrepo-com.svg",
  },
  { id: 4, name: "Transport", icon: "assets/transport-svgrepo-com.svg" },
  { id: 5, name: "Health", icon: "assets/health-care-love-svgrepo-com.svg" },
  { id: 6, name: "Education", icon: "assets/education-svgrepo-com.svg" },
];

currentBudgetElement.textContent = currentBudget + "$";

function addCategory(id, name, icon) {
  categories.push({ id, name, icon });
}

categories.forEach((el) => {
  let btn = document.createElement("div");
  btn.innerHTML = `
    <img src="${el.icon}" alt="${el.name}">
    <span>${el.name}</span>`;

  btn.id = el.id;
  btn.className = "calc_category";

  btn.addEventListener("click", () => {
    const inputValue = Number(input.value);
    if (!inputValue) return;
    if (inputValue <= 0) {
      alert("Ошибка в инпуте");
      return;
    }
    if (inputValue > currentBudget) {
      alert("Вне бюджета");
      return;
    }
    paymentsHistory.push({ category: el, value: inputValue });
    currentBudget -= inputValue;
    currentBudgetElement.textContent = currentBudget + "$";
    input.value = "";

    let paymentDiv = document.createElement("div");
    let lastPayment = paymentsHistory[paymentsHistory.length - 1];
    paymentDiv.className = "calc_history_payment";
    paymentDiv.innerHTML = `
    <span>${lastPayment.value}$</span>
    <img src="${lastPayment.category.icon}" alt="${lastPayment.category.name}">`;
    historyContainer.append(paymentDiv);
  });
  categoriesContainer.append(btn);
});
