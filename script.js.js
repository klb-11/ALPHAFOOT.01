document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".cart_icon");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    addToCartButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            const product = this.closest(".produit_Adidas, .produit_Nike, .produit_puma");
            const title = product.querySelector(".titre_produit").innerText;
            const price = parseFloat(product.querySelector(".prix").innerText.replace("$", ""));
            const img = product.querySelector("img").getAttribute("src");

            const item = { title, price, img };
            cart.push(item);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Produit ajouté au panier !");
        });
    });

    const cartItemsContainer = document.getElementById("cart_items");
    const totalPriceEl = document.getElementById("total-price");
    const orderButton = document.querySelector("a[href='COMMANDER.html']");

    if (cartItemsContainer && totalPriceEl) {
        renderCart();
    }

    function renderCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
                <img src="${item.img}" class="cart-img" alt="">
                <div class="cart-details">
                    <h3>${item.title}</h3>
                    <p>${item.price.toFixed(2)} $</p>
                </div>
            `;
            cartItemsContainer.appendChild(div);
        });

        totalPriceEl.innerText = "Total : " + total.toFixed(2) + " $";
    }

    if (orderButton) {
        orderButton.addEventListener("click", function () {
            localStorage.removeItem("cart");
        });
    }
});
