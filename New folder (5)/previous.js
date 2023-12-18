document.addEventListener('DOMContentLoaded', function () {
    // Retrieve previous orders from localStorage
    const previousOrders = JSON.parse(localStorage.getItem('previous_order')) || [];

    // Get the container where orders will be displayed
    const previousOrdersContainer = document.getElementById('previousOrdersContainer');

    // Iterate through previous orders and display them
    for (let order of previousOrders) {
        // Access orderDetails and items as needed
        const orderDetails = order.orderDetails;
        const items = order.items;

        // Create a div for each order
        const orderDiv = document.createElement('div');
        orderDiv.classList.add('previous-order');

        // Display orderDetails including orderId
        const orderDetailsInfo = document.createElement('h3');
        // orderDetailsInfo.textContent = `Order ID: ${orderDetails.orderId}`;
        orderDiv.appendChild(orderDetailsInfo);

        // Iterate through items and display them
        for (let item of items) {
            const itemInfo = document.createElement('p');
            itemInfo.textContent = `${item.name} - Quantity: ${item.quantity}, Price: ₹${item.price*item.quantity}`;
            orderDiv.appendChild(itemInfo);
        }

        // Add the order div to the container
        previousOrdersContainer.appendChild(orderDiv);
    }
});
function clearorder(){
    alert('do you want to remove')
    localStorage.removeItem('previous_order')
    location.reload();
}