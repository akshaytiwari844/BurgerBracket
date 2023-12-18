let checkoutdata = document.querySelector('.checkout_container');
const checkdata = JSON.parse(localStorage.getItem('cart1')) || [];
console.log(checkdata);

let totalAmount = 0;
let mealCount = 0;
let mealDiscount = 150;

let burgerCount = 0;
let friesCount = 0;
let drinkCount = 0;

let checkoutHTML = '';

for (let item of checkdata) {
    // Update counters based on item type and quantity
    switch (item.type) {
        case 'burger':
            burgerCount += item.quantity || 1;
            break;
        case 'fries':
            friesCount += item.quantity || 1;
            break;
        case 'drink':
            drinkCount += item.quantity || 1;
            break;
    }

    totalAmount += item.price * (item.quantity || 1);

    checkoutHTML += `<div class="orderc"><h3><img src="${item.image}" alt="${item.name}" width="30" height="30">${item.name}</h3>
                     <h4>Quantity: ${item.quantity} Price: ${item.quantity * item.price}</h4></div>`;
    // checkoutHTML += `<h3>-----------------------------------------------------</h3>`;
}

const minOfThree = Math.min(burgerCount, friesCount, drinkCount);
console.log(minOfThree, "minimum of three");

if (minOfThree == 0) {
    console.log("meal not found");
    console.log(totalAmount);

    checkoutHTML += `<h3>Total amount: ₹${totalAmount}</h3>`;
    checkoutHTML += '<h3>To make it a complete meal and qualify for a discount, add more products.</h3>';
    checkoutHTML += `<div class="formfill">
    <h3>Checkout</h3>
        <label for="name">Enter your Name</label>
        <input type="text" id="email" name="Name" required>

        <label for="phone">Enter your phone number</label>
        <input type="number" id="phone" name="phone" required>

        <button type="submit" id="submit">Pay ₹${totalAmount}</button>
    </div>`;

} else {
    checkoutHTML += `<h3>Total amount before discount: ₹${totalAmount}</h3>`;
    totalAmount = totalAmount - minOfThree * mealDiscount;
    console.log(totalAmount, "total amount after discount");

    mealCount += minOfThree;
    checkoutHTML += `<h3>Meal discount applicable: ₹${minOfThree * mealDiscount}</h3>`;
    checkoutHTML += `<h3>Total amount after discount: ₹${totalAmount}</h3>`;
    checkoutHTML += `<h3>Meals auto generated: ${mealCount}</h3>`;

    console.log(mealCount, "number of meals you have");
    checkoutHTML += `<div class="formfill">
    <h3>Checkout</h3>
        <label for="name">Enter your Name</label>
        <input type="text" id="email" name="Name" required>

        <label for="phone">Enter your phone number</label>
        <input type="number" id="phone" name="phone" required>

        <button type="submit" id="submit">Pay ₹${totalAmount}</button>
    </div>`;
}

// Update the counts in your HTML or wherever needed
console.log('Burger Count:', burgerCount);
console.log('Fries Count:', friesCount);
console.log('Drink Count:', drinkCount);

// Update your checkoutdata with checkoutHTML
checkoutdata.innerHTML = checkoutHTML;

// Dynamically set the styles for the "formfill" div
const formfillDiv = document.querySelector('.formfill');
formfillDiv.style.position = 'fixed';
formfillDiv.style.top = '300px';
formfillDiv.style.right = '250px';
formfillDiv.style.width = '500px'; // Increased width by 50%
formfillDiv.style.padding = '40px'; // Increased padding by 50%
formfillDiv.style.backgroundColor = '#fff';
formfillDiv.style.boxShadow = '-3px 2px 9px rgb(202, 227, 205)';
formfillDiv.style.backgroundColor = 'black';
formfillDiv.style.fontSize = '30px'; // Increased font size by 50%
formfillDiv.style.borderRadius = '15px'; // Added border radius






// Adjustments for small screens
if (window.innerWidth <= 600) {
    formfillDiv.style.width = '100%';
    formfillDiv.style.padding = '10px';
}

// // Event listener for the "Pay" button
// let buttonpay = document.querySelector('#submit');

// buttonpay.addEventListener('click', function () {
//     let email = document.getElementById('email').value;
//     let phone = document.getElementById('phone').value;

//     if (email === '') {
//         alert('Enter name');
//     } else if (phone === '' || phone.length < 10 || phone.length > 10) {
//         alert('Phone number must be of 10 digits');
//     } else {
//         // Your existing code for payment
//         alert(`Thank you for the payment ${email}. Payment of ₹${totalAmount} is completed. Your order id is: ${Math.floor(Math.random() * 100)}`);
//         window.location.href = 'landinpage.html';
//         // localStorage.clear();
//         localStorage.removeItem('cart1')
//         console.log(checkdata);

//         setTimeout(function () {
//             document.querySelector('.logo-section').style.display = 'none';
//             document.querySelector('.landing-page-section').style.display = 'block';
//         }, 2500); // Change the delay as needed

//     }

// });
// Event listener for the "Pay" button
let buttonpay = document.querySelector('#submit');

buttonpay.addEventListener('click', function () {
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;

    if (email === '') {
        alert('Enter name');
    } else if (phone === '' || phone.length < 10 || phone.length > 10) {
        alert('Phone number must be of 10 digits');
    } else {
        // Retrieve current cart items from localStorage
        const cartItems = JSON.parse(localStorage.getItem('cart1')) || [];

        // Assuming you have retrieved and calculated the order details
        const orderDetails = {
            // ... order details
        };

        // Create an array to store the items in the previous order
        const previousOrders = JSON.parse(localStorage.getItem('previous_order')) || [];

        // Add the current order items to the previous orders
        previousOrders.push({
            orderDetails: orderDetails,
            items: cartItems
        });

        // Save the updated previous orders back to localStorage
        localStorage.setItem('previous_order', JSON.stringify(previousOrders));

        // Clear the current cart items from localStorage
        localStorage.removeItem('cart1');

        // Your existing code for payment
        alert(`Thank you for the payment ${email}. Payment of ₹${totalAmount} is completed. Your order id is: ${Math.floor(Math.random() * 100)}`);
        window.location.href = 'landinpage.html';

        setTimeout(function () {
            document.querySelector('.logo-section').style.display = 'none';
            document.querySelector('.landing-page-section').style.display = 'block';
        }, 2500); // Change the delay as needed
    }
});
