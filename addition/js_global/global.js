

function displayMenuAccountMobile(menuList, setMenuMobileWidth, theOtherOne, leftOrRight) {
  const menuListVar = document.getElementById(menuList);
  console.log(menuList);
  // console.log(setMenuMobileWidth);
  const divMenuListContainer = document.querySelector(`[id="${setMenuMobileWidth}"]`);
  //another way bellow, to get by ID
  // const divMenuListContainer = document.getElementById(setMenuMobileWidth);
  // console.log(divMenuListContainer);
  const theOtherDivToHide = document.querySelector(`[id="${theOtherOne}"]`);

  const styles_stage1 = {
    "background-color": "lightgray",
    "width": "60%",
    "height": "50vh"
  };
  const styles_stage2 = {
    "background-color": "lightgray",
    "width": "60%",
    "height": "50vh",
    "position": "absolute",
    "z-index": "1000"
  };

  /* if (leftOrRight === 'rightOne') {
    const positionOfOverlayStart = "right";

  } */

  const positionOfOverlayStart = (leftOrRight === 'rightOne') ? "right" : "left";


  if (menuListVar.style.display === "flex") {
    menuListVar.style.display = "none";
    // divMenuListContainer.style.width = "60%";

    // Object.assign(divMenuListContainer.style, styles_stage1);
    divMenuListContainer.setAttribute("style", "width: 60%;");

    //bellow we hide the other div with menu, on mobiles
    theOtherDivToHide.style.display = "flex";

  } else {
    menuListVar.style.display = "flex";
    // divMenuListContainer.style.width = "60%";
    // Object.assign(divMenuListContainer.style, styles_stage2);
    divMenuListContainer.setAttribute("style", `width: 100vw; height: 100vh; background-color: #16234c; position: fixed; ${positionOfOverlayStart}:0; top:0; z-index: 1000; opacity: 95%; `);
    //bellow we hide the other div with menu (on mobiles)
    theOtherDivToHide.style.display = "none";
  }
}


function changeSomeOnWindowResize() {
  const divContainerTopMenu = document.querySelector('#containerTopMenu');
  const divAccount_menu = document.querySelector('#account_menu');
  const divMenu_opts = document.querySelector('#menu_opts');
  const divCateg_menu = document.querySelector('#categ_menu');
  const divMenu_opts_categ = document.querySelector('#menu_opts_categ');

  if (window.innerWidth > 768) {
    // console.log(window.innerWidth); 
    divContainerTopMenu.removeAttribute('style');
    divAccount_menu.removeAttribute('style');
    divMenu_opts.removeAttribute('style');
    divCateg_menu.removeAttribute('style');
    divMenu_opts_categ.removeAttribute('style');
  }

}

window.addEventListener('resize', changeSomeOnWindowResize);


const userLoggedIn =JSON.parse(localStorage.getItem('usrLoggedIn'));
// console.log('userLoggedIn: ', userLoggedIn);
const loggedUserName = userLoggedIn[1];
// console.log('loggedUserName: ', loggedUserName);


function getUsr() {
  const select1 = document.querySelector('menu > li');
  // console.log('select1:', select1);
  return select1;
}
//bellow we try to read from html but no luck
//most probably because of use of include external html with javascript :(
/* window.addEventListener('load', () => {
  setTimeout(getUsr(), 3000);
});

document.addEventListener('DOMContentLoaded', function() {
  // your code here
  setTimeout(getUsr(), 3000);
}, false);

document.onreadystatechange = function(){
  if (document.readyState === "complete") {
    // getUsr();
  }
  else {
     window.onload = function () {
      // getUsr();
     };
  };
} */

//solution:
setTimeout(() => {
  // console.log("2 Delayed for 1 second.");
  getUsr();

if (loggedUserName) {
const fromGetUsr = getUsr();
// console.log('fromGetUsr', fromGetUsr);
htmlOnList = `welcome, ${loggedUserName}`;
fromGetUsr.innerHTML = htmlOnList;  

}
else {
  htmlOnList = `<a href="/sign-in/sign-in.html" target="_self" rel="noopener noreferrer"><i
  class="fa-solid fa-right-to-bracket"></i> Log In / Sign Up</a>`;
}



}, "500")

