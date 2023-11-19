    let title = document.getElementById('title')
    let price = document.getElementById('price')
    let taxes = document.getElementById('taxes')
    let ads = document.getElementById('ads')
    let discount = document.getElementById('discount')
    let count = document.getElementById('count')
    let category = document.getElementById('category')
    let submit = document.getElementById('submit')
    let mood = 'create';
    let tmp;

    // get total
    function getTotal() {
        if (price.value != '') {
            total.innerHTML = (+price.value + +taxes.value + +ads.value) - +discount.value;
            total.style.background = '#040'
        } else {
            total.style.background = '#a00d02'
            total.innerHTML = ''
        }
    }
    // creat product 

    let dataProduct;
    if (localStorage.product != null) {
        dataProduct = JSON.parse(localStorage.product)

    } else {
        dataProduct = [];
    }

    submit.onclick = function () {
        let newProduct = {
            title: title.value.toLowerCase(),
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value.toLowerCase(),
        }
        if (title.value !=''&&
        price.value!=''
        &&category.value!=''
        &&count.value<=100) {
            if (mood === 'create') {
            // repeat 

            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    dataProduct.push(newProduct);
                }

            } else {
                dataProduct.push(newProduct);
            }
        } else {
            dataProduct[tmp] = newProduct;
            mood = 'create';
            submit.innerHTML = 'Create'
            count.style.display = 'block'
        }   
        clearData()
        }


        // save localStorage
        localStorage.setItem('product', JSON.stringify(dataProduct))
        
        showData()
    }

    // clear inputs
    function clearData() {
        title.value = ''
        price.value = ''
        taxes.value = ''
        ads.value = ''
        discount.value = ''
        total.innerHTML = ''
        count.value = ''
        category.value = ''
    }
    // showData
    function showData() {
        getTotal()
        let table = '';
        for (let i = 0; i < dataProduct.length; i++) {
            table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`


        }
        document.getElementById('tbody').innerHTML = table;
        let deleteAllBtn = document.getElementById('deleteAllBtn')
        if (dataProduct.length > 0) {
            deleteAllBtn.innerHTML = '<button onclick="deleteAll()">Delete All</button>'

        }
    }
    showData()
    // delete
    function deleteData(i) {
        dataProduct.splice(i, 1)
        localStorage.product = JSON.stringify(dataProduct);
        showData()
    }
    // deleteAllBtn code
    function deleteAll() {
        localStorage.clear()
        dataProduct.splice(0)
        showData()
    }
    // updateData
    function updateData(i) {
        title.value = dataProduct[i].title;
        price.value = dataProduct[i].price;
        taxes.value = dataProduct[i].taxes;
        ads.value = dataProduct[i].ads;
        discount.value = dataProduct[i].discount;
        getTotal()
        category.value = dataProduct[i].category;
        count.style.display = 'none';
        submit.innerHTML = 'Update';
        mood = 'update'
        tmp = i;
        scroll({
            top: 0,
            behavior: "smooth"
        })
    }
    // search
    let searchMood = 'title'

    function getSearchMood(id) {
        let search = document.getElementById(('search'))
        if (id == 'searchTitle') {
            searchMood = 'title'
        } else {
            searchMood = 'category'
        }
        search.placeholder = 'Search By ' + searchMood;
        search.focus()
        search.value = '';
        showData();
    }

    function searchData(value) {
        let table = '';
        for (let i = 0; i < dataProduct.length; i++) {
            if (searchMood == 'title') {
                if (dataProduct[i].title.includes(value.toLowerCase())) {
                    table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>`

                }

            } else {

                if (dataProduct[i].category.includes(value.toLowerCase())) {
                    table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>`

                }


            }
        }
        document.getElementById('tbody').innerHTML = table;

    }
    // Scroll Back To Top Button
let scrollBtn = document.getElementById('scrollBtn')

window.onscroll = function(){
    if (scrollY >= 500) 
    {
        scrollBtn.style.display = 'block';
    }
    else{
        scrollBtn.style.display = 'none'
    }
    
}

scrollBtn.onclick = function () {
    scroll({
        left:0,
        top:0,
        behavior:"smooth"

    })
    
}