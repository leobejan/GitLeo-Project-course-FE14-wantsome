function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) { elmnt.innerHTML = this.responseText; }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}




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

