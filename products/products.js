const fisierProduse = '/addition/db_data/db-products.json';


//AN EXAMPLE of promise with try/catch
async function getProducts() {
    let url = fisierProduse;
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderProducts() {    
    let products = await getProducts();
    console.log(products);
     let html = '';
     products.forEach(product => {
        let htmlSegment = `<div class="product_box">
        <div class="img_container">
            <img src="/addition/pics-products/${product.pic1}" height="200px" alt="${product.Name}" />
        </div>

        <h4>${product.Name} <br/> Code: ${product.EANcode}</h4>
        <div class="prod_type"><b>Type:</b> ${product.Type}. <b>${product.LRhand}</b> handed</div>
        <div class="prod_type"><b>Brand:</b>${product.Brand}. </div>
        <div class="prod_show_more"><a href="/product-page/product-page.html?prodId=${product.idProd}">Show more...</a></div>
                        </div>`;

        html += htmlSegment;
    });

    let container = document.querySelector('.products_container');
    container.innerHTML = html; 
}

renderProducts();