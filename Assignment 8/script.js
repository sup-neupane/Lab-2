const products = [
  { id: 1, name: 'Wireless Headphones', price: 79.99 },
  { id: 2, name: 'Smart Watch', price: 149.99 },
  { id: 3, name: 'Bluetooth Speaker', price: 49.99 },
  { id: 4, name: 'Portable Charger', price: 29.99 },
  { id: 5, name: 'E-reader', price: 99.99 },
];

const cart = {}; // cart dictionary by product id

const productList = document.getElementById('productList');
const cartBody = document.getElementById('cartBody');
const cartTotal = document.getElementById('cartTotal');

function renderProducts() {
  productList.innerHTML = '';
  products.forEach((product) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: $${product.price.toFixed(2)}</p>
      <button data-id="${product.id}">Add to Cart</button>
    `;
    card.querySelector('button').addEventListener('click', () => addToCart(product));
    productList.appendChild(card);
  });
}

function renderCart() {
  cartBody.innerHTML = '';
  let total = 0;

  Object.values(cart).forEach((item) => {
    const row = document.createElement('tr');
    const subtotal = item.quantity * item.price;
    total += subtotal;

    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td><input type="number" min="1" value="${item.quantity}" data-id="${item.id}" /></td>
      <td>$${subtotal.toFixed(2)}</td>
      <td><button data-id="${item.id}">Remove</button></td>
    `;

    row.querySelector('button').addEventListener('click', () => removeFromCart(item.id));
    row.querySelector('input').addEventListener('change', (event) => {
      const value = Number(event.target.value);
      updateQuantity(item.id, value);
    });

    cartBody.appendChild(row);
  });

  cartTotal.textContent = total.toFixed(2);
}

function addToCart(product) {
  if (cart[product.id]) {
    cart[product.id].quantity += 1;
  } else {
    cart[product.id] = { ...product, quantity: 1 };
  }
  renderCart();
}

function removeFromCart(productId) {
  delete cart[productId];
  renderCart();
}

function updateQuantity(productId, quantity) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  cart[productId].quantity = quantity;
  renderCart();
}

renderProducts();
renderCart();