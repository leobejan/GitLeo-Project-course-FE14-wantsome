//********************************* START of rendering types and brands:

async function extractItems(whatWeExtract) {
    //INITIALLY I FETCHED FROM an json file and used the bellow; after I decided to use only data
    //from local storage and I leave for a while the initial code here...

    /* let newData;
    let fisierProduse = (whatWeExtract === "types") ? '/addition/db_data/db-categories.json' : '/addition/db_data/db-brands.json'
    // console.log('fisierProduse: ', fisierProduse)
    await fetch(fisierProduse)
        .then((res) => {
            // console.log(res);
            if (res.ok) {
                return res.json();
            }
            throw new Error('Something went wrong');
        })
        .then((items) => {
            //   console.log(produse);
            newData = items;
            // console.log(newData);
        })
        .catch((error) => {
            console.log(error);
        }) */
    let newData = (whatWeExtract === "types") ? localStorage.getItem('db-categories') : localStorage.getItem('db-brands')
    newData = JSON.parse(newData);
    return newData;
}

async function getItemsFromExtract(variableToPassIt) {
    let itemsExtract = await extractItems(variableToPassIt);
    // console.log('itemsExtract: ', itemsExtract);
    let toWhomAppend = '';
    let htmlInitial = `<option value="">ALL</option>`;
    let html = '';
    let htmlSegment = '';
    switch (variableToPassIt) {
        case 'types':
            toWhomAppend = document.querySelector('#sel_type');
            // console.log('toWhomAppend: ', toWhomAppend);            
            
            itemsExtract.slice(0, 5).forEach((item) => {
                htmlSegment = `<option value="${item}">${item}</option>`;
                html += htmlSegment;
            });
            toWhomAppend.innerHTML =  htmlInitial + html;
            break;
        case 'brands':
            toWhomAppend = document.querySelector('#sel_brand');
            // console.log('toWhomAppend2: ', toWhomAppend2);
            itemsExtract.forEach((item) => {
                htmlSegment = `<option value="${item}">${item}</option>`;
                html += htmlSegment;
            });
            toWhomAppend.innerHTML =  htmlInitial + html;
            break;
        default:
            console.log('BE CAREFUL what type you asked for (types or brands ONLY): ');
    }

}

getItemsFromExtract('types');
getItemsFromExtract('brands');
//********************************* END of rendering types and brands:

const filters = document.querySelector("#filterForm");
filters.addEventListener("input", filter_sort_paginate);

const sorting = document.querySelector("#sort_bt_prod_list");
sorting.addEventListener("input", filter_sort_paginate);

let rawArrFromLS = JSON.parse(localStorage.getItem('db-products'));

function filter_sort_paginate() {


// ******* get clicked filters - BEGIN
    const type_fromHtml = filters.querySelector("#sel_type").value.toLowerCase();
    console.log('type_fromHtml: ', type_fromHtml);
    const brand_fromHtml = filters.querySelector("#sel_brand").value.toLowerCase();
    console.log('brand_fromHtml: ', brand_fromHtml);
    const side_fromHtml = filters.querySelector('input[name="lr_hand_name"]:checked');
    // console.log('side_fromHtml: ', side_fromHtml);
    const side_fromHtml_checked = side_fromHtml.value.toLowerCase();
    console.log('side_fromHtml_checked: ', side_fromHtml_checked);

    colours_fromHtml_checked = filters.querySelectorAll("#colour input:checked")
    colours_fromHtml = [...colours_fromHtml_checked].map((n) => {
        // console.log('n.value:', n.value);
        return n.value.toLowerCase();
    }
    )
    console.log('colours_fromHtml: ', colours_fromHtml);

    const priceMin = document.querySelector("#price-min").value;
    const priceMax = document.querySelector("#price-max").value;
// ******* get clicked filters - END

/* const filteredArr = rawArrFromLS.filter(
          (n) =>
            (!type_fromHtml || n.type === type_fromHtml) &&
            (!colours_fromHtml.length || colours_fromHtml.includes(n.Colour)) &&
            (!priceMin || priceMin <= n.cost) &&
            (!priceMax || priceMax >= n.cost)
        ) */

const filteredArr = rawArrFromLS.filter( (n) => {
    console.log('type_fromHtml ::', type_fromHtml);
    console.log('n.Type ::', n.Type);

    console.log('colours_fromHtml.length ::', colours_fromHtml.length);
    console.log('n.Colour ::', n.Colour.toLowerCase());
    console.log('colours_fromHtml.includes(n.Colour) ::', colours_fromHtml.includes(n.Colour.toLowerCase()));
    return (!type_fromHtml || n.Type.toLowerCase() === type_fromHtml) 
            && (!colours_fromHtml.length || colours_fromHtml.includes(n.Colour.toLowerCase()));
})

console.log('filteredArr:', filteredArr);
document.querySelector("#number_items_found").innerHTML = `Found: ${filteredArr.length} items`;
    renderItems(filteredArr);


    filteredSortedArr = [1, 2, 3];
    return filteredSortedArr;

} //end of func filter_sort_paginate



function renderItems(items) {
    document.querySelector(".products_container").innerHTML = items.map( (product) => `
    <div class="product_box">
        <div class="img_container">
            <img src="/addition/pics-products/${product.pic1}" height="200px" alt="${product.Name}" />
        </div>

        <h4><i>${product.Name}</i> <br/> Code: ${product.EANcode}</h4>
        <div class="prod_type">Type: <b>${product.Type}</b>. Side: <b>${product.LRhand}</b></div>
        <div class="prod_type">Brand: <b>${product.Brand}</b>. </div>
        <div class="prod_show_more"><a href="/product-page/product-page.html?prodId=${product.idProd}">Show more...</a></div>
                        </div>
  `
    )
    .join("");

    document.querySelector("#number_items_found").innerHTML = `Found: ${items.length} items`;

}

//initial display of ALL products
renderItems(rawArrFromLS);