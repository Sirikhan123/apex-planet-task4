// To-Do List
function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  if (task !== "") {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    displayTasks();
  }
}

function displayTasks() {
  const taskList = document.getElementById("taskList");
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;
    li.onclick = () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
    };
    taskList.appendChild(li);
  });
}

window.onload = function () {
  displayTasks();
  displayProducts();
};

// Products
const products = [
  { name: "Laptop", category: "electronics", price: 1000, rating: 4.5, brand: "Dell" },
  { name: "Headphones", category: "electronics", price: 200, rating: 4.2, brand: "Sony" },
  { name: "T-Shirt", category: "clothing", price: 30, rating: 4.0, brand: "Nike" },
  { name: "Jeans", category: "clothing", price: 50, rating: 4.3, brand: "Levis" },
];

function displayProducts(productList) {
  const container = document.getElementById("productList");
  container.innerHTML = "";
  productList.forEach(product => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${product.name}</strong><br>
      Price: $${product.price} <br>
      Rating: ${product.rating} ⭐<br>
      Brand: ${product.brand}
    `;
    div.style.marginBottom = "15px";
    container.appendChild(div);
  });
}

function filterProducts() {
  const category = document.getElementById("categoryFilter").value;
  const sort = document.getElementById("sortFilter").value;

  let filtered = products;

  if (category !== "all" && category !== "default") {
    filtered = filtered.filter(p => p.category === category);
  }

 
  if (sort === "price") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sort === "brand") {
    filtered.sort((a, b) => a.brand.localeCompare(b.brand));
  }

  displayProducts(filtered);
}