$(document).ready(function() {

    function createCheckoutProductCard(obj) {
        // <div class="checkout-card">
        //     <div>
        //         <img class="checkout-product-img" src="/assets/default-product.png" />
        //     </div>
        //     <div>
        //         <h4>Product Title</h4>
        //         <p>x3</p>
        //         <p>Amount: Rs <span>30000</span></p>
        //     </div>
        // </div>

        var card = document.createElement('div');
        card.classList.add('checkout-card');

        var firstInnerDiv = document.createElement('div');
        var productImg = document.createElement('img');
        productImg.classList.add('checkout-product-img');
        productImg.src = obj.preview;
        firstInnerDiv.appendChild(productImg);

        var secondInnerDiv = document.createElement('div');
        var productName = document.createElement('h4');
        productName.innerHTML = obj.name;
        var productCount = document.createElement('p');
        productCount.innerHTML = 'x'+obj.count;
        var amountLabel = document.createElement('span');
        amountLabel.innerHTML = 'Amount: Rs ';
        var amountSpan = document.createElement('span');
        amountSpan.innerHTML = parseInt(obj.count) * parseInt(obj.price);
        var productAmount = document.createElement('p');
        productAmount.appendChild(amountLabel);
        productAmount.appendChild(amountSpan);
        secondInnerDiv.appendChild(productName);
        secondInnerDiv.appendChild(productCount);
        secondInnerDiv.appendChild(productAmount);

        card.appendChild(firstInnerDiv);
        card.appendChild(secondInnerDiv);

        return card;
    }

    var checkOutList = window.localStorage.getItem('checkOut-list');
    checkOutList = checkOutList === null || checkOutList === '' ? [] : checkOutList;
    checkOutList = checkOutList.length > 0 ? JSON.parse(checkOutList) : [];

    // console.log(checkOutList);
    var grandTotal = 0;
    for(var i=0; i<checkOutList.length; i++) {
        $('#card-list').append(createCheckoutProductCard(checkOutList[i]));
        // console.log('Count => ', checkOutList[i].count);
        // console.log('Price => ', checkOutList[i].price);

        var totalForCurrentProduct = parseFloat(checkOutList[i].count) * parseFloat(checkOutList[i].price);

        grandTotal = grandTotal + totalForCurrentProduct;

        // console.log('Total For Product '+ i + ' is=> ' + totalForCurrentProduct);
    }

    $('#item-count').html(checkOutList.length);
    $('#total-amount').html(grandTotal);

    $('#btn-place-order').click(function() {
        if(grandTotal>0){

            alert('Order Placed Successfully')
            localStorage.setItem('checkOut-list', []);

            location.assign('./thankyou.html');
        }
        else{
            alert("you don't have any items in your cart please add items to cart")
            location.assign("./mockApi.html")
        }
    
    })
})