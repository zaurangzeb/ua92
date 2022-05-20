/* get the total of the all the carts on the pages and total them from that session. */
updateCartTotal();

/* button event listeners for if a specified event occurs.*/
document.getElementById("emptycart").addEventListener("click", emptyCart);
var btns = document.getElementsByClassName('addtocart');
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {addToCart(this);});
}

/* the stuff for the add to cart function to make it work */

function addToCart(elem) {
    //variables for cart
    var sibs = [];
    var getprice;
    var getproductName;
    var cart = [];
     var stringCart;
    //cycles siblings for product info near the add button so like for the price.
    while(elem = elem.previousSibling) {
        if (elem.nodeType === 3) continue;
        if(elem.className == "price"){
            getprice = elem.innerText;
        }
        if (elem.className == "productname") {
            getproductName = elem.innerText;
        }
        sibs.push(elem);
    }
    //creates the product as an object for js.
    var product = {
        productname : getproductName,
        price : getprice
    };
    //convert product data to JSON for storage
    var stringProduct = JSON.stringify(product);
    /*sends the product data to a session storage which is used across all the webpages.*/
    
    if(!sessionStorage.getItem('cart')){
        //transfers the data to the cart array
        cart.push(stringProduct);
        //moves whats needed in the cart to the json
        stringCart = JSON.stringify(cart);
        //this creates the session storage cart items
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
    else {
        //get existing cart data from storage and convert back into the array for storage
       cart = JSON.parse(sessionStorage.getItem('cart'));
        //append new product JSON object
        cart.push(stringProduct);
        //cart back to JSON
        stringCart = JSON.stringify(cart);
        //this allows it to overwrite the cart data in sessionstorage 
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
}
/* Calculate the Cart Total for the sum of the basket*/
function updateCartTotal(){

    var total = 0;
    var price = 0;
    var items = 0;
    var productname = "";
    var carttable = "";
    if(sessionStorage.getItem('cart')) {
        //get cart data & parse to array
        var cart = JSON.parse(sessionStorage.getItem('cart'));
        //get no of items in cart 
        items = cart.length;
        //loop over cart array
        for (var i = 0; i < items; i++){
            //convert each JSON product in array back into object
            var x = JSON.parse(cart[i]);
            //get property value of price
            price = parseFloat(x.price.split('£')[1]);
            productname = x.productname;
            //add price to total
            carttable += "<tr><td>" + productname + "</td><td>£" + price.toFixed(2) + "</td></tr>";
            total += price;
        }
        
    }
    //update total on website HTML
    document.getElementById("total").innerHTML = total.toFixed(2);
    //insert saved products to cart table
    document.getElementById("carttable").innerHTML = carttable;
    //update items in cart on website HTML
    document.getElementById("itemsquantity").innerHTML = items;
}
//user feedback on every successful add to the cart.
function addedToCart(pname) {
  var message = pname + " was added to the cart";
  var alerts = document.getElementById("alerts");
  alerts.innerHTML = message;
  if(!alerts.classList.contains("message")){
     alerts.classList.add("message");
  }
}
/* allows the User to Manually empty the cart if they want to remove all the items*/
function emptyCart() {
    //removes the cart session storage object & refreshes the cart total so it essentially refreshes it.
    if(sessionStorage.getItem('cart')){
        sessionStorage.removeItem('cart');
        updateCartTotal();
      //clear message and remove class style
      var alerts = document.getElementById("alerts");
      alerts.innerHTML = "";
      if(alerts.classList.contains("message")){
          alerts.classList.remove("message");
      }
    }
}

function checkoutNow() {
	alert("Your order has been processed")
}