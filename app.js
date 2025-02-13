const prodauctData = () => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((json) => displayData(json));
  };
  
  prodauctData();
  
  const displayData = (data) => {
    const productContainer = document.getElementById("product-container");
    data.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
      productDiv.innerHTML = `
        <img class="product-img" src="${product.image}" alt="" />
        <h5>${product.title.slice(0, 50)}...</h5>
        <h2>${(product.price * 125).toFixed(2)} tk</h2>
        <button class="bg-primary" onclick="addToCart('${product.title}', ${product.price})">Add to cart</button>
      `;
      productContainer.appendChild(productDiv);
    });
  };
  
  let total = 0;
  function addToCart(title, price) {
    let cartBody = document.getElementById("cart-Items");
    let cartItem = document.createElement("div");
  
    let numericPrice = parseFloat(price) * 125;
    total += numericPrice;
  
    let totalPrice = document.getElementById("totalPrice");
    totalPrice.textContent = total.toFixed(2);
  
    let shortTitle = title.length > 10 ? title.slice(0, 10) + "..." : title;
  
    cartItem.classList.add("cartItem");
    cartItem.classList.add("container");
    cartItem.innerHTML = `
      <p title="${title}"> ${shortTitle} - <span id="price">${numericPrice.toFixed(2)}</span> TK 
        <button onclick="removeItemFromCart(this, ${numericPrice})" class="text-danger">x</button>
      </p>`;
  
    cartBody.appendChild(cartItem);
  }
  
  // Function to Remove Cart Item
  function removeItemFromCart(button, price) {
    let cartItem = button.parentElement.parentElement;
    total -= parseFloat(price);
    let totalPrice = document.getElementById("totalPrice");
    totalPrice.textContent = total.toFixed(2);
    cartItem.remove();
  }
  
  // Function to Minimize & Maximize Cart
  function toggleCart() {
    let cartItemsContainer = document.getElementById("cartBody");
    let toggleButton = document.getElementById("toggleButton");
  
    if (cartItemsContainer.classList.contains("hidden")) {
      cartItemsContainer.classList.remove("hidden");
      toggleButton.textContent = "−"; // Maximize
    } else {
      cartItemsContainer.classList.add("hidden");
      toggleButton.textContent = "+"; // Minimize
    }
  }


// Function to Checkout
function checkoutCart() {
    let totalPrice = document.getElementById("totalPrice").textContent;
  
    if (total === 0) {
      alert("Your cart is empty! Add items before checkout.");
      return;
    }
  
    // Display total amount in an alert
    alert(`Total Price: ${totalPrice} TK\nThank you for shopping!`);
  
    // Optionally clear the cart after checkout
    document.getElementById("cart-Items").innerHTML = "";
    document.getElementById("totalPrice").textContent = "0.00";
    total = 0; // Reset total price
  }
  

  
  