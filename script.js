// Product data
const products = {
    1: {
        title: "Premium Fashion Collection - Clothes",
        image: "box1_image.jpg",
        price: "$29.99 - $199.99",
        rating: "4.2",
        about: "Discover our premium fashion collection featuring the latest trends in clothing. From casual wear to formal attire, we have everything you need to upgrade your wardrobe. Our collection includes high-quality materials and modern designs that suit every occasion.",
        features: [
            "Premium quality fabrics",
            "Latest fashion trends",
            "Multiple size options",
            "Easy care instructions",
            "30-day return policy",
            "Free shipping on orders over $50"
        ]
    },
    2: {
        title: "Health & Personal Care Essentials",
        image: "box2_image.jpg",
        price: "$9.99 - $79.99",
        rating: "4.5",
        about: "Take care of your health and wellness with our comprehensive range of health and personal care products. From skincare to vitamins, we offer products that help you look and feel your best every day.",
        features: [
            "FDA approved products",
            "Natural ingredients",
            "Dermatologist tested",
            "Long-lasting results",
            "Suitable for all skin types",
            "Money-back guarantee"
        ]
    },
    3: {
        title: "Modern Furniture Collection",
        image: "box3_image.jpg",
        price: "$199.99 - $1,999.99",
        rating: "4.3",
        about: "Transform your living space with our modern furniture collection. Each piece is carefully crafted to combine style, comfort, and functionality. Perfect for any room in your home.",
        features: [
            "Premium quality materials",
            "Modern and stylish designs",
            "Easy assembly instructions",
            "Durable construction",
            "Free delivery and setup",
            "5-year warranty"
        ]
    },
    4: {
        title: "Latest Electronics & Gadgets",
        image: "box4_image.jpg",
        price: "$49.99 - $999.99",
        rating: "4.6",
        about: "Stay connected with the latest electronics and gadgets. From smartphones to smart home devices, we offer cutting-edge technology that makes your life easier and more enjoyable.",
        features: [
            "Latest technology",
            "Brand warranty included",
            "Fast and secure delivery",
            "Expert customer support",
            "Compatible with all devices",
            "30-day return policy"
        ]
    },
    5: {
        title: "Beauty Picks - Skincare & Makeup",
        image: "box5_image.jpg",
        price: "$12.99 - $89.99",
        rating: "4.4",
        about: "Enhance your natural beauty with our curated selection of skincare and makeup products. From daily essentials to special occasion glam, find everything you need for a complete beauty routine.",
        features: [
            "Cruelty-free products",
            "Long-lasting formulas",
            "Suitable for all skin tones",
            "Professional quality",
            "Hypoallergenic options",
            "Free beauty consultation"
        ]
    },
    6: {
        title: "Pet Care Products & Accessories",
        image: "box6_image.jpg",
        price: "$8.99 - $149.99",
        rating: "4.7",
        about: "Show your furry friends how much you care with our premium pet care products. From nutritious food to fun toys, we have everything to keep your pets happy, healthy, and entertained.",
        features: [
            "Veterinarian approved",
            "Natural and organic options",
            "Durable and safe materials",
            "Suitable for all pet sizes",
            "Free pet care guide",
            "Subscription options available"
        ]
    },
    7: {
        title: "New Arrival in Toys & Games",
        image: "box7_image.jpg",
        price: "$14.99 - $199.99",
        rating: "4.5",
        about: "Spark imagination and creativity with our new collection of toys and games. Perfect for kids of all ages, these toys are designed to be both fun and educational, promoting learning through play.",
        features: [
            "Educational and fun",
            "Safe for children",
            "Age-appropriate options",
            "Durable construction",
            "Battery-free options available",
            "Gift wrapping available"
        ]
    },
    8: {
        title: "Discover Fashion Trends",
        image: "box8_image.jpg",
        price: "$19.99 - $299.99",
        rating: "4.3",
        about: "Stay ahead of the fashion curve with our latest fashion trends collection. From streetwear to high fashion, discover unique pieces that express your personal style and make a statement.",
        features: [
            "Trending designs",
            "Limited edition pieces",
            "Sustainable fashion options",
            "Stylist recommendations",
            "Size guide available",
            "Express shipping options"
        ]
    }
};

// Load product details when on product-details page
function loadProductDetails() {
    if (window.location.pathname.includes('product-details.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id') || '1';
        const product = products[productId];

        if (product) {
            document.getElementById('productTitle').textContent = product.title;
            document.getElementById('productImage').src = product.image;
            document.getElementById('productImage').alt = product.title;
            document.getElementById('productPrice').textContent = product.price;
            document.getElementById('productRating').textContent = `(${product.rating})`;
            document.getElementById('productAbout').textContent = product.about;
            
            const featuresList = document.getElementById('productFeatures');
            featuresList.innerHTML = '';
            product.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });
        } else {
            // Default to product 1 if invalid ID
            window.location.href = 'product-details.html?id=1';
        }
    }
}

// Add to cart functionality
function addToCart() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || '1';
    const product = products[productId];
    
    if (product) {
        // Get existing cart or create new one
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if product already in cart
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Show confirmation
        alert(`${product.title} has been added to your cart!`);
        
        // Update cart count in navbar if element exists
        updateCartCount();
    }
}

// Buy now functionality
function buyNow() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || '1';
    const product = products[productId];
    
    if (product) {
        alert(`Redirecting to checkout for: ${product.title}\n\nThis is a demo. In a real application, this would redirect to the checkout page.`);
    }
}

// Update cart count in navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartElement = document.querySelector('.nav-cart');
    if (cartElement && totalItems > 0) {
        // Add or update cart count badge
        let cartCount = cartElement.querySelector('.cart-count');
        if (!cartCount) {
            cartCount = document.createElement('span');
            cartCount.className = 'cart-count';
            cartCount.style.cssText = 'background-color: #f08804; color: white; border-radius: 50%; padding: 2px 6px; font-size: 0.7rem; margin-left: 5px;';
            cartElement.appendChild(cartCount);
        }
        cartCount.textContent = totalItems;
    }
}

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    loadProductDetails();
    updateCartCount();
    
    // Add search functionality
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon');
    
    if (searchInput && searchIcon) {
        const performSearch = () => {
            const query = searchInput.value.trim();
            if (query) {
                alert(`Searching for: ${query}\n\nThis is a demo. In a real application, this would show search results.`);
            }
        };
        
        searchIcon.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Back to top functionality
    const backToTop = document.querySelector('.foot-panel1');
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Make logo clickable to go home
    const logo = document.querySelector('.nav-logo');
    if (logo && !logo.href) {
        logo.href = 'index.html';
    }
});

