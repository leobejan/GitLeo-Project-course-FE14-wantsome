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
            toWhomAppend.innerHTML = html;
            break;
        case 'brands':
            toWhomAppend = document.querySelector('#sel_brand');
            // console.log('toWhomAppend2: ', toWhomAppend2);
            itemsExtract.forEach((item) => {
                htmlSegment = `<option value="${item}">${item}</option>`;
                html += htmlSegment;
            });
            toWhomAppend.innerHTML = html;
            break;
        default:
            let toWhomAppend3 = null;
            console.log('BE CAREFUL what type you asked for (types or brands ONLY): ');
    }

}

getItemsFromExtract('types');
getItemsFromExtract('brands');
//********************************* END of rendering types and brands:

let nonFilteredArr = JSON.parse(localStorage.getItem('db-products'));

let productDataArr = '';
if (!sessionStorage.getItem('arrDataFiltered') || sessionStorage.getItem('arrDataFiltered') === '[]') {
    productDataArr = JSON.parse(localStorage.getItem('db-products'));
    console.log('DIN IF: productDataArr: ', productDataArr);
}
else {
    productDataArr = JSON.parse(sessionStorage.getItem('arrDataFiltered'));
    console.log('DIN ELSE: productDataArr: ', productDataArr);
}

// console.log('productDataArr: ', productDataArr);
//********************************* START of rendering products FILTERED:
/* let db_content_prod_raw = JSON.parse(localStorage.getItem('db-products'));
console.log('db_content_prod_raw: ', db_content_prod_raw); */




function modifyArray(theArr, what, actualVal) {
    console.log('array-ul de parcurs:: ', theArr);
    console.log('what:', what);
    console.log('actualVal DIN modifyArray(): ', actualVal); 

//see if there is already an filter, if yes then the array who will be
//filtered should be the main array, not the previosly filtered one
    let what_2;
    if (what === 'Type') what_2 = "types";
    if (what === 'Brand') what_2 = "brands";
    if (what === 'LRhand') what_2 = "sides";
    console.log(' loc_sess_storage_Read(what): ',  loc_sess_storage_Read(what_2));
    if (loc_sess_storage_Read(what_2) !== '') {
        theArr = nonFilteredArr;
    }

    let newDataProducts = theArr.filter((obj) => { 
        let xx = obj[what];
        console.log('xx:', xx);

        // if (typeof (actualVal) !== 'number' && obj.Type == actualVal.toLowerCase()) {
            console.log('obj[what].toLowerCase() ESTE: ', obj[what].toLowerCase());
            console.log('actualVal.toLowerCase() ESTE: ', actualVal.toLowerCase());        
    return obj[what].toLowerCase() == actualVal.toLowerCase();
    })
 
        

        if (actualVal !== loc_sess_storage_Read(what_2)) {            
            sessionStorage.setItem('arrDataFiltered', JSON.stringify(newDataProducts));
        }
        else {
            sessionStorage.setItem('arrDataFiltered', JSON.stringify(productDataArr));
        }
    
    console.log('newDataProducts DIN modifyArray():', newDataProducts);
    return newDataProducts;
}





const select_type = document.getElementById('sel_type');
select_type.addEventListener('change', function handleChange(event) {
    let whatSelected_type = event.target.value;
    console.log('whatSelected_type: ', whatSelected_type);
modifyArray(productDataArr, 'Type', whatSelected_type);
    loc_sess_storage_Write('types', whatSelected_type);
    updateSelectRadioHtml('types');  
    location.reload();
});
// console.log('productDataArr DIN aFaRa: ', productDataArr);


const select_brand = document.getElementById('sel_brand');
select_brand.addEventListener('change', function handleChange(event) {
    let whatSelected_brand = event.target.value;
    console.log('whatSelected_brand: ', whatSelected_brand);
modifyArray(productDataArr, 'Brand', whatSelected_brand);
    loc_sess_storage_Write('brands', whatSelected_brand);
    updateSelectRadioHtml('brands');
    location.reload();
});

// const select_side = document.getElementsByName('lr_hand_name');
const select_side = document.querySelectorAll('input[name="lr_hand_name"]');
// console.log('select_side: ', select_side);
select_side.forEach((elem) => {
    elem.addEventListener("change", function (event) {
        let whatSelected_side = event.target.value;
        console.log('whatSelected_side---', whatSelected_side);
modifyArray(productDataArr, 'LRhand', whatSelected_side);
        loc_sess_storage_Write('sides', whatSelected_side);
        updateSelectRadioHtml('sides');
        location.reload();
    });
});
//********************************* END of rendering products FILTERED:



function updateSelectRadioHtml(what_clicked) {
    let select = '';
    let actualValFromLS = '';
    switch (what_clicked) {
        case 'products':
            select = document.getElementById('no_per_page_prod_list');
            actualValFromLS = loc_sess_storage_Read('products');
            break;
        case 'types':
            select = document.getElementById('sel_type');
            actualValFromLS = loc_sess_storage_Read('types');
            // console.log('actualValFromLS DIN CASE TYPE:', actualValFromLS);

            break;
        case 'brands':
            select = document.getElementById('sel_brand');
            actualValFromLS = loc_sess_storage_Read('brands');
            break;
        case 'sides':
            select = document.getElementsByName('lr_hand_name');
            actualValFromLS = loc_sess_storage_Read('sides');
            break;
        default:

    }

    if (["products", "types", "brands"].includes(what_clicked)) {
        // console.log('actualValFromLS:', actualValFromLS);
        const options = Array.from(select.options);
        // console.log('options:', options);
        const optionToSelect = options.find(item => item.value == actualValFromLS);
        // console.log('optionToSelect:', optionToSelect);
        optionToSelect.selected = true;
    } else {
        // console.log('select ESTE:', select);
        // console.log('actualValFromLS:', actualValFromLS);
        for (i = 0; i < select.length; i++) {
            if (select[i].value == actualValFromLS) {
                select[i].checked = true;
            }
        }
    }
    // return db_content_prod;
}





//********************************* bellow are for products listing and pagination:

function loc_sess_storage_Read(what) {
    // const toVar = localStorage.getItem('itemPerPage');
    let toVarReturn;

    switch (what) {
        case 'products':
            toVarReturn = (!localStorage.getItem('itemPerPage')) ? 2 : localStorage.getItem('itemPerPage')
            break;
        case 'types':
            toVarReturn = (!sessionStorage.getItem('filter_type')) ? 'ALL' : sessionStorage.getItem('filter_type')
            break;
        case 'brands':
            toVarReturn = (!sessionStorage.getItem('filter_brand')) ? 'ALL' : sessionStorage.getItem('filter_brand')
            break;
        case 'sides':
            toVarReturn = (!sessionStorage.getItem('filter_side')) ? 'BOTH' : sessionStorage.getItem('filter_side')
            break;
        default:
            toVarReturn = null;
    }
    return toVarReturn;
}

function loc_sess_storage_Write(what, val) {
    switch (what) {
        case 'products':
            localStorage.setItem('itemPerPage', val);
            break;
        case 'types':
            sessionStorage.setItem('filter_type', val);
            break;
        case 'brands':
            sessionStorage.setItem('filter_brand', val);
            break;
        case 'sides':
            sessionStorage.setItem('filter_side', val);
            break;
        default:
            toVarReturn = null;
    }
}


//listen to onchange when user choose another number of items per page
//and 1. update the selection in prefs (local storage)
//2. update the new value in select option (place "selected = true" on option)
//3. reload the page in order to read the new settings
const selectNoPerPage = document.getElementById('no_per_page_prod_list');
selectNoPerPage.addEventListener('change', function handleChange(event) {
    whatSelected = event.target.value;
    // console.log('whatSelected: ', whatSelected);
    loc_sess_storage_Write('products', whatSelected);
    // call the function who set on option fields the "selected" check
    updateSelectRadioHtml('products');

    location.reload();
});




//bellow is the pagination stuff:
const db_content_prod = productDataArr; //passed here the array of products already read from LS above
if (!db_content_prod) {
    alert('no products database in local storage !!!');
}
// const db_content_prod_arr = JSON.parse(db_content_prod);
const db_content_prod_arr = db_content_prod;
// console.log('db_content_prod_arr: ', db_content_prod_arr);
const paginationNumbers = document.getElementById("pagination-numbers");
const paginatedList = document.querySelector(".products_container");
const listItems = db_content_prod_arr;
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");


//we set an pagination limit (how many items per page) and after we will calculate pageCount
//as total number of items divided by pagination limit
const paginationLimit = loc_sess_storage_Read('products');
const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage = 1;

//we can define a function to create a new button for the page number and then add the
//buttons to the paginationNumbers container.
const appendPageNumber = (index) => {
    const pageNumber = document.createElement("button");
    pageNumber.className = "pagination-number";
    pageNumber.innerHTML = index;
    pageNumber.setAttribute("page-index", index);
    pageNumber.setAttribute("aria-label", "Page " + index);

    paginationNumbers.appendChild(pageNumber);
};

const getPaginationNumbers = () => {
    // console.log("pageCount DIN getPaginationNumbers: ", pageCount);
    for (let i = 1; i <= pageCount; i++) {
        appendPageNumber(i);
    }
};


//define a function to only display as many items are allowed in the paginationLimit on each page
//1. Set the value of the currentPage variable to the pageNum value
const setCurrentPage = (pageNum) => {
    currentPage = pageNum;
    //4. Include handleActivePageNumber() function here
    //so the active page number is updated every time a new page is set
    handleActivePageNumber();

    //5. call the func for disable/enable next & previous buttons
    handlePageButtonsStatus();

    //2. Get the range for items to be shown     
    const prevRange = (pageNum - 1) * paginationLimit;
    const currRange = pageNum * paginationLimit;
    //3.Loop through the list of items to be displayed   

    let html = '';
    db_content_prod_arr.forEach((product, index) => {
        if (index >= prevRange && index < currRange) {
            let htmlSegment = `<div class="product_box">
        <div class="img_container">
            <img src="/addition/pics-products/${product.pic1}" height="200px" alt="${product.Name}" />
        </div>

        <h4><i>${product.Name}</i> <br/> Code: ${product.EANcode}</h4>
        <div class="prod_type">Type: <b>${product.Type}</b>. Side: <b>${product.LRhand}</b></div>
        <div class="prod_type">Brand: <b>${product.Brand}</b>. </div>
        <div class="prod_show_more"><a href="/product-page/product-page.html?prodId=${product.idProd}">Show more...</a></div>
                        </div>`;

            // console.log("htmlSegment din foreach:", htmlSegment);
            html += htmlSegment;
            paginatedList.innerHTML = html;
        }
    });
};


//define a function to add the active class to the page number we just clicked
const handleActivePageNumber = () => {
    document.querySelectorAll(".pagination-number").forEach((button) => {
        button.classList.remove("active");

        const pageIndex = Number(button.getAttribute("page-index"));
        if (pageIndex == currentPage) {
            button.classList.add("active");
        }
    });
};//Include this function in the setCurrentPage function

//here we define func to disable prev/next buttons if reached to
//min or max page
const disableButton = (button) => {
    button.classList.add("disabled");
    button.setAttribute("disabled", true);
};

const enableButton = (button) => {
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
};

const handlePageButtonsStatus = () => {
    if (currentPage === 1) {
        disableButton(prevButton);
    } else {
        enableButton(prevButton);
    }

    if (pageCount === currentPage) {
        disableButton(nextButton);
    } else {
        enableButton(nextButton);
    }
};



window.addEventListener("load", () => {
    //Update the window.load() event to set the current page as page 1 once the webpage loads
    getPaginationNumbers();
    setCurrentPage(1);

    prevButton.addEventListener("click", () => {
        setCurrentPage(currentPage - 1);
    });

    nextButton.addEventListener("click", () => {
        setCurrentPage(currentPage + 1);
    });

    //Use a click event listener to trigger the setCurrentPage function whenever a page number button is clicked   
    document.querySelectorAll(".pagination-number").forEach((button) => {
        const pageIndex = Number(button.getAttribute("page-index"));

        if (pageIndex) {
            button.addEventListener("click", () => {
                setCurrentPage(pageIndex);
            });
        }
    });

    //these 4 updateSelected should remain HERE on onload
    //otherwise will not be read because (atleast for types and brands) they are
    //dynamically generated by javascript

    updateSelectRadioHtml('products');
    updateSelectRadioHtml('types');
    updateSelectRadioHtml('brands');
    updateSelectRadioHtml('sides');
});

//END of pagination stuff...







