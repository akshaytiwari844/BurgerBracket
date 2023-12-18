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
    // border: 1px solid #fff;
    padding: 10px;
    width: 250px; /* Set a fixed width for each container */
    height: 300px; /* Set a fixed height for each container */
    margin: 0 10px 10px 0; /* Adjust margin as needed to add space between each item */
    text-align: center;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: top; /* Align containers to the top of the line */
    position: relative; /* Ensure proper alignment */
    overflow: hidden; /* Prevent content overflow */
    box-shadow: -3px 2px 9px rgb(5, 95, 28);
    
">
    <img src="${itemInLocal[i].image}" alt="" style="
        width: 50%;
        height: 40%; /* Adjust the height as needed */
        object-fit: cover; /* Maintain aspect ratio and cover the container */
        margin-bottom: 10px; /* Add space between image and text */
    ">
    <p>${itemInLocal[i].name}</p>
    <p>Price: ₹${itemInLocal[i].price}</p>
    <button class='remove' style="
        width: calc(100% - 20px); /* Adjust width to fit within the container */
        padding: 5px;
        background-color: #997570;
        color: aliceblue;
        cursor: pointer;
        position: absolute;
        bottom: 10px; /* Adjust the distance from the bottom */
        left: 10px; /* Adjust the distance from the left */
    " onClick="removedata(${i})">Remove </button>
    
</div>
`;
    }

    // Update the HTML content after the loop
    productdetail.innerHTML = htmlContent;
} else {
    productdetail.innerHTML = `<h2> Explore our products and get back here</h2>`;
}

//------onclick events---->
function putdataonlocal(product) {
    let itemincart = JSON.parse(localStorage.getItem('cart1')) || [];
    const newcartitem = { name: product.name, price: product.price };
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
        localStorage.clear();
        console.log('Local storage cleared');
        location.reload();
    } else {
        console.log('Clear operation canceled');
    }
}
