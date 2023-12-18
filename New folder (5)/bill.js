let storedData = localStorage.getItem('cart2');

// Check if there is any data in local storage
if (storedData) {
    // Parse the string into a JavaScript object
    storedData = JSON.parse(storedData);

    // Access the properties of the object
    console.log(storedData.email);
    console.log(storedData.phone);
} else {
    console.log('No data found in local storage.');
}
