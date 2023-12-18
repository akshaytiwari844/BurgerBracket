//-----<dom manipulation>-----
let itemInLocal = JSON.parse(localStorage.getItem('cart1')) || [];
let productdetail = document.querySelector('#textdetails');

// Check if there are items in the cart
if (itemInLocal.length > 0) {
    let htmlContent = ''; // Initialize an empty string to accumulate HTML content

    for (let i = 0; i < itemInLocal.length; i++) {
        htmlContent += `
<div class="cartcontainer" style="
    color: aliceblue;
    padding: 10px;
    width: 250px;
    height: 300px;
    margin: 0 10px 10px 0;
    text-align: center;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: top;
    position: relative;
    overflow: hidden;
    box-shadow: -3px 2px 9px rgb(202, 227, 205);
     border-radius: 17px;
">
    <img src="${itemInLocal[i].image}" alt="" style="
        width: 50%;
        height: 40%;
        object-fit: cover;
        margin-bottom: 10px;
    ">
    <p>${itemInLocal[i].name}</p>
    <p>Price: ₹${itemInLocal[i].price}</p>
    <div class="quantity-controls">
        <button class="quantity-btn" onclick="updateQuantity(${i}, -1)">-</button>
        <span class="quantity">${itemInLocal[i].quantity}</span>
        <button class="quantity-btn" onclick="updateQuantity(${i}, 1)">+</button>
    </div>
    
</div>
`;
    }

    // Update the HTML content after the loop
    productdetail.innerHTML = htmlContent;
} else {
    productdetail.innerHTML = `<h2> Explore our products and get back here</h2>`;
}

// Update quantity and re-render the cart
function updateQuantity(index, change) {
    itemInLocal[index].quantity += change;

    // If the quantity is zero or less, remove the item from the cart
    if (itemInLocal[index].quantity <= 0) {
        removedata(index);
    } else {
        localStorage.setItem('cart1', JSON.stringify(itemInLocal));
        location.reload();
    }
}

//------onclick events---->
function putdataonlocal(product) {
    let itemincart = JSON.parse(localStorage.getItem('cart1')) || [];
    const newcartitem = { name: product.name, price: product.price, quantity: 1 };
    itemincart.push(newcartitem);
    localStorage.setItem('cart1', JSON.stringify(itemincart));
    console.log(itemincart);
}

// Remove selected item from cart
function removedata(index) {
    const remove = window.confirm('Are you sure you want to remove this product?');
    if (remove) {
        itemInLocal.splice(index, 1);
        localStorage.setItem('cart1', JSON.stringify(itemInLocal));
        location.reload();
    }
}

function clearcart() {
    const userConfirmed = window.confirm('Are you sure you want to clear the cart?');
    if (userConfirmed) {
        localStorage.removeItem('cart1')
        console.log('Local storage cleared');
        location.reload();
    } else {
        console.log('Clear operation canceled');
    }
}
