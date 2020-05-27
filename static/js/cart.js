async function addToCart(id, element) {
    let response = await fetch("/order/add?id=" + id);
    
    if (response.status == 201) {

            imagePosition = $(element).position(); 
            cartPosition = $('#cart').position(); 
            cartPosition.left = cartPosition.left + ( $('#cart').width() / 5 ); 
            cartPosition.top = cartPosition.top + ( $('#cart').height() / 5 ); 

            var PhotoElements = element.closest('.product-item').getElementsByClassName('product-photo-locale');
            
            $('body').prepend('<div id="imageToCart"><img src="'+ $(PhotoElements[0]).attr('src') +'"></div>'); 
            
            $('#imageToCart img').css({
             'position': 'absolute',
             'z-index': '1999',
             'left': (imagePosition.left - 0)+ 'px',
             'top': (imagePosition.top  - 315)+ 'px',
             'width': 248 + 'px',
             'height': 248 + 'px'
            });
            
            $('#imageToCart img').animate({
             top: '0px',
             left: cartPosition.left + 'px',
             opacity: '0',
             width: 248 / 5,
             height: 248 / 5
             }, 1000, function() {
             $('#imageToCart').remove();
             });
            

    } else if (response.status == 403) {
        element.innerHTML = "Действие недоступно";
    } else if (response.status == 401) {
        window.location.href = "/entry";
    } else {
        element.innerHTML = "Ошибка, попробуйте позже";
    }
}

async function delItem(id, element) {
    hideElement(element);
    let response = await fetch("/order/remove?id=" + id);
}
async function DecreaseItem(id, element) {
    element.nextElementSibling.innerHTML--;
    if (element.nextElementSibling.innerHTML == 0) {
        delItem(id, element);
    }
    fullPriceRemove(element);
    let response = await fetch("/order/decrease?id=" + id);
}
async function InsertItem(id, element) {
    let response = await fetch("/order/add?id=" + id);
}
async function IncreaseItem(id, element) {
    element.previousElementSibling.innerHTML++;
    InsertItem(id, element);
    fullPriceAdd(element);
}

async function fullPriceAdd(element){
    document.getElementById('fullPrice').innerHTML=+document.getElementById('fullPrice').innerHTML+(+element.closest('.cart-item').getElementsByClassName('product-price')[0].innerHTML);
}
async function fullPriceRemove(element){
    document.getElementById('fullPrice').innerHTML=+document.getElementById('fullPrice').innerHTML-(+element.closest('.cart-item').getElementsByClassName('product-price')[0].innerHTML);
}

async function CompleteOrder(){
    var elements = document.getElementsByClassName('product-price');
    for (let element of elements) {
        hideElement(element);
    }  
    let response = await fetch("/order/complete");
}
    
async function hideElement(element){
    element.closest('.cart-item').style.display = "none";
    var flagElement = false;
                var list = document.getElementsByClassName('cart-item');
                for (let element of list) {
                    if (element.style.display != "none") {
                        flagElement = true;
                        break;
                    }
                }               
                if (!flagElement) {
                    document.getElementsByClassName('info-text')[0].style.display='flex';
                    document.querySelector('.footer-cart').style.display='none';
                }
}
