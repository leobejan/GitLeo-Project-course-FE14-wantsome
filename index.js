const fisierProduse = '/addition/db_data/db-products.json';
async function extractProducts() {
    let newData;
    // console.log('din extract')
    await fetch(fisierProduse)
        .then((res) => {
            // console.log(res);
            if (res.ok) {
                return res.json();
            }
            throw new Error('Something went wrong');
        })
        .then((produse) => {
            //   console.log(produse);
            newData = produse;
            // console.log(newData);
            // return produse;
        })
        .catch((error) => {
            console.log(error);
        })
return newData;

//second method, also works. with try:
    /* try {
        let res = await fetch(fisierProduse);
        return await res.json();
    } catch (error) {
        console.log(error);
    } */
}

async function getProductsFromExtract() {
    let productsExtract = await extractProducts();
    console.log(productsExtract);


    
}

// console.log(extractProducts());
// console.log(getProductsFromExtract());
getProductsFromExtract();


/*
users.json = 
[{
    "username": "john",
    "firstName": "John",
    "lastName": "Doe",
    "gender": "Male",
    "profileURL": "img/male.png",
    "email": "john.doe@example.com"
},
{
    "username": "jane",
    "firstName": "Jane",
    "lastName": "Doe",
    "gender": "Female",
    "profileURL": "img/female.png",
    "email": "jane.doe@example.com"
}
];
//AN EXAMPLE of promise with try/catch
async function getUsers() {
    let url = '/addition/db_data/users.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderUsers() {    
    let users = await getUsers();
    console.log(users);
     let html = '';
    users.forEach(user => {
        let htmlSegment = `<div class="user">
                            <h2>${user.firstName} ${user.lastName}</h2>
                            <div class="email"><a href="email:${user.email}">${user.email}</a></div>
                        </div>`;

        html += htmlSegment;
    });

    let container = document.querySelector('.container');
    container.innerHTML = html; 
}

// renderUsers();
*/