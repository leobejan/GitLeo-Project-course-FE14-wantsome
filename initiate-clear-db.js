
function initiateOrClearDB() {
    let btnPressInit = document.querySelector('button[value="INITIATE"]');
    // console.log('btnPressInit: ', btnPressInit);
    btnPressInit.addEventListener('click', (evt) => {
        let arrTabeleBd = ['db-brands.json', 'db-categories.json', 'db-products.json', 'user_prefs.json', 'users.json'];
        for (const iterator of arrTabeleBd) {
            // console.log(iterator);

            const nameBD = iterator.slice(0, -5);
            // console.log(nameBD);

            // alert('apasat init');
            const db_content = localStorage.getItem(nameBD);
            // console.log(`variab dbcontent.. ${nameBD}:: `, db_content);
            // alert(`${nameBD}:: ` + db_content);
            evt.preventDefault();
            //I put here an prevent default in order to stop refreshing
            //the page and see in console what I need

            if (!db_content) {
                // console.log('NU am gasit tabel :( ' + nameBD);
                // alert('NU am gasit tabel :( ' + nameBD);

                const nameFileWithExtension = nameBD + '.json';
                readFileAndCreateDb(nameBD, nameFileWithExtension);
            }
        }
    })


    let btnPressClear = document.querySelector('button[value="CLEAR"]');
    // console.log('btnPressClear: ', btnPressClear);
    btnPressClear.addEventListener('click', (evt) => {
        evt.preventDefault();
        // alert('apasat clear');
        localStorage.clear();
    })



}


async function readFileAndCreateDb(nameOfDB, dbLocaFile) {
    const fileNameConcat = '/addition/db_data/' + dbLocaFile;
    try {
        const response = await fetch(fileNameConcat);
        if (!response.ok) {
            const message = 'Error with Status Code: ' + response.status;
            throw new Error(message);
        }
        const data = await response.json();
        console.log(data);
        localStorage.setItem(nameOfDB, JSON.stringify(data));
    } catch (erro) {
        console.log('Error: ' + erro);
    }
}

initiateOrClearDB();