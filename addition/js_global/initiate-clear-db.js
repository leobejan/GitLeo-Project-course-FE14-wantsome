
function initiateOrClearDB() {
    let btnPressInit = document.querySelector('button[value="INITIATE"]');
    // console.log('btnPressInit: ', btnPressInit);
    btnPressInit.addEventListener('click', (evt) => {
        alert('apasat init');
        const db_produse = localStorage.getItem('db_produse');
        console.log('db_produse: ', db_produse);
        alert('db_produse:' + db_produse);
        evt.preventDefault();
        //I put here an prevent default in order to stop refreshing
        //the page and see in console what I need
        if (!db_produse) {
            console.log('NU am gasit db_produse :( ');
            alert('NU am gasit db_produse :( ');

            //const ceSeVaScr = JSON.stringify(readJsonFile('/addition/db_data/db-brands.json'));
            const ceSeVaScr = readJsonFile('/addition/db_data/db-brands.json');

            console.log('ceSeVaScr: ', ceSeVaScr);
            localStorage.setItem("LokSto_produse", ceSeVaScr)

        }
    })


    let btnPressClear = document.querySelector('button[value="CLEAR"]');
    // console.log('btnPressClear: ', btnPressClear);
    btnPressClear.addEventListener('click', (evt) => {
        evt.preventDefault();
        alert('apasat clear');
        localStorage.clear();
    })



}

async function readJsonFile(locatiaFetch) {
let toRet = fetch(locatiaFetch)
        .then(raspuns => {
            // console.log(raspuns);
            //vzi si alt log, mai jos:
            // console.log(raspuns.json());
            return raspuns.json();
        })
        .then(dataRcvd => {
            /* console.log(dataRcvd);
            return dataRcvd; */
            let xx = dataRcvd.length;
            //return xx;
        })
        .catch(ero => {
            console.log(ero);
        })

        toRet = 444;

        console.log('toRet: ', toRet);
        return toRet;
}
// readJsonFile('/addition/db_data/db-brands.json');

let ceIseseDinFunc = readJsonFile('/addition/db_data/db-brands.json');

console.log(ceIseseDinFunc);

initiateOrClearDB();