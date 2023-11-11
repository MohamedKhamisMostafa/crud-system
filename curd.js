    let title = document.getElementById('title')
    let price = document.getElementById('price')
    let taxes = document.getElementById('taxes')
    let ads = document.getElementById('ads')
    let discount = document.getElementById('discount')
    let count = document.getElementById('count')
    let category = document.getElementById('category')
    let submit = document.getElementById('submit')

    // get total
    function getTotal(){
        if (price.value != '') {
            total.innerHTML = (+price.value + +taxes.value + +ads.value) - +discount.value;
            total.style.background = '#040'   
        }else{
            total.style.background ='#a00d02'
            total.innerHTML=''
        }
    }