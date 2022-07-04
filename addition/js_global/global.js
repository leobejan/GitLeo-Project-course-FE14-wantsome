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
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
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
    // console.log(menuList);
    // console.log(setMenuMobileWidth);
    const divMenuListContainer = document.querySelector(`[id="${setMenuMobileWidth}"]`);
    //another way bellow, to get by ID
    // const divMenuListContainer = document.getElementById(setMenuMobileWidth);
    // console.log(divMenuListContainer);
    const theOtherDivToHide = document.querySelector(`[id="${theOtherOne}"]`);
    if (menuListVar.style.display === "flex") {
      menuListVar.style.display = "none";
      divMenuListContainer.style.width = "60%";
      //bellow we hide the other div with menu, on mobiles
      theOtherDivToHide.style.display = "flex";
      
    } else {
      menuListVar.style.display = "flex";
      divMenuListContainer.style.width = "60%";
      //bellow we hide the other div with menu, on mobiles
      theOtherDivToHide.style.display = "none";
    }
  }

