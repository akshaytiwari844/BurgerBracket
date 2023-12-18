document.addEventListener('DOMContentLoaded', function () {
    // Load products from JSON file
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const productContainer = document.getElementById('product-container');
            for(let product in products){

            }
            // Display all products
            products.forEach(product => {
                const card = createProductCard(product);
                productContainer.appendChild(card);
            });
        });

        function createProductCard(product) {
            const card = document.createElement('div');
            card.classList.add('product-card');
        
            const image = document.createElement('img');
            image.src = product.image; // Set the image source
            image.alt = product.name; // Set the alt attribute for accessibility
        
            const title = document.createElement('h3');
            title.textContent = product.name;
        
            const price = document.createElement('p');
            price.textContent = `₹${product.price.toFixed(2)}`;
        
            const quantityLabel = document.createElement('label');
            quantityLabel.textContent = 'Quantity:';
        
            const quantitySelect = document.createElement('select');
            quantitySelect.id = 'quantitySelect';
            for (let i = 1; i <= 10; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                quantitySelect.appendChild(option);
            }
        
            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Add to Cart';
        
            // Add the click event listener inside createProductCard
            addToCartButton.addEventListener('click', function () {
                const selectedQuantity = parseInt(quantitySelect.value);
                addToCart(product, selectedQuantity);
            });
        
            card.appendChild(image);
            card.appendChild(title);
            card.appendChild(price);
            card.appendChild(quantityLabel);
            card.appendChild(quantitySelect);
            card.appendChild(addToCartButton);
        
            return card;
        }
        
        function addToCart(product, quantity) {
            let cartItems = JSON.parse(localStorage.getItem('cart1')) || [];
            
            // Add the new item to the cart with the selected quantity
            const newItem = { 
                name: product.name, 
                price: product.price, 
                type: product.type,
                description: product.description,
                image: product.image,
                quantity: quantity  // Use the quantity parameter
            };
            
            cartItems.push(newItem);
            
            
            // Save the updated cart back to local storage
            localStorage.setItem('cart1', JSON.stringify(cartItems));
        
            // Optionally, you can notify the user or update the UI to indicate success
            // alert(`Added ${quantity} ${product.name}(s) to the cart!`);
        
            // Optionally, you can notify the user or update the UI to indicate success
            if (Notification.permission === "granted") {
                new Notification(`Added ${quantity} ${product.name} to the cart!`);
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        new Notification(`Added ${quantity} ${product.name} to the cart!`);
                    }
                });
            }
        }
        
});
//<---------------------------------------------------------------------------------------->
//filter the prodcts'

function searchProducts() {
    const searchInput = document.getElementById('searchid');
    const searchTerm = searchInput.value.toLowerCase();

    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const productContainer = document.getElementById('product-container');

            // Filter products by name
            const filteredProducts = filterProducts(products, searchTerm);
            displayProducts(filteredProducts);
        });
}

function filterProducts(products, searchTerm) {
    return products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );
}

        function displayProducts(products) {
            const productContainer = document.getElementById('product-container');
            productContainer.innerHTML = ''; // Clear existing content

            // Display all products
            products.forEach(product => {
                const card = createProductCard(product);
                productContainer.appendChild(card);
            });
        }

        function filterProducts(products, searchTerm) {
            return products.filter(product =>
                product.name.toLowerCase().includes(searchTerm)
            );
        }

        function createProductCard(product) {
            const card = document.createElement('div');
            card.classList.add('product-card');

            const image = document.createElement('img');
            image.src = product.image; // Set the image source
            image.alt = product.name; // Set the alt attribute for accessibility

            const title = document.createElement('h3');
            title.textContent = product.name;

            const price = document.createElement('p');
            price.textContent = `₹${product.price.toFixed(2)}`;

            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Add to Cart';

            // Add the click event listener inside createProductCard
            addToCartButton.addEventListener('click', function () {
                let cartItems = JSON.parse(localStorage.getItem('cart1')) || [];
                console.log(cartItems)
                // Add the new item to the cart
                const newItem = { name: product.name, price: product.price ,type:product.type,description:product.description,image:product.image};
                cartItems.push(newItem);
                console.log(newItem)
                console.log(cartItems);
        
                // Save the updated cart back to local storage
                localStorage.setItem('cart1', JSON.stringify(cartItems));
        
                // Optionally, you can notify the user or update the UI to indicate success
                alert(`Added ${product.name} to the cart!`);
            });

            card.appendChild(image);
            card.appendChild(title);
            card.appendChild(price);
            card.appendChild(addToCartButton);

            return card;
        }


const filterSelect = document.getElementById('filter');
filterSelect.addEventListener('change', function() {
    // Get the selected value when the user changes the selection
    const selectedCategory = filterSelect.value;

    // Do something with the selected category, like filtering your products
    filterProductsByCategory(selectedCategory);
});

function filterProductsByCategory(category) {
    // Fetch products from JSON file
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            // Get the product container element
            const productContainer = document.getElementById('product-container');

            // Clear existing content in the product container
            productContainer.innerHTML = '';

            // Filter products based on the selected category
            const filteredProducts = category === 'all' ? products : filterProducts(products, category);

            // Display the filtered products
            displayProducts(filteredProducts);
        })
        .catch(error => console.error('Error fetching products:', error));
}

