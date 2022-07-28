const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('prodId');
if (!productId) {
alert('u r visiting this page without query parameters, so no prodId will be collected from URL');
}
console.log(productId);
dataAll = JSON.parse(localStorage.getItem('db-products'));
console.log(dataAll);
prod_details = dataAll.find(( { idProd } ) => idProd == productId);
console.log(prod_details);

txtFromArrName = prod_details.Name;
let html2insert_name = `
<h3>${txtFromArrName} </h3>
<p>&nbsp;</p>
`;
const titleInsert = document.querySelector('.prod_list_top');
titleInsert.innerHTML = html2insert_name;

let html2insert_title4cart = `
<h4>${txtFromArrName} </h4>
<p>&nbsp;</p>
`;
const titleInsertCartArea = document.querySelector('.titleInCart');
titleInsertCartArea.innerHTML = html2insert_title4cart;


txtFromArrPrice = prod_details.price;
let html2insert_price = `
<h2>$: ${txtFromArrPrice}</h2>
<input type="button" value="-">
<input type="number" id="qty" step="1" min="1" max="15" name="qty" value="1" size="4" placeholder="" inputmode="numeric">
<input type="button" value="+">
`;
const priceInsert = document.querySelector('.priceAndPlusMinus');
priceInsert.innerHTML = html2insert_price;



txtFromArrDescShort = prod_details.ShortDesc;
txtFromArrDesc = prod_details.Desc;
console.log(txtFromArrDesc);
let html2insert_desc = `
<b>On short</b>:<br/>
<p>&nbsp;</p>
${txtFromArrDescShort} <br>
<p>&nbsp;</p>
<strong>Description</strong>:<br/>
<p>&nbsp;</p>
${txtFromArrDesc}<br/>
`;

let html2insert_details = `
<table width="100%" border="10" cellpadding="2" cellspacing="0">
  <caption>
    Details of product
  </caption>
  <thead>
  <tr>
  <th width="30%" scope="col">Code:</th>
  <th width="70%" scope="col">&nbsp;</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>Type:</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Brand</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Side:</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Price:</td>
    <td>&nbsp;</td>
  </tr>
  </tbody>
</table>
`;
const descInsert = document.querySelector('.desc_text');
descInsert.innerHTML = html2insert_desc;

const detailsInsert = document.querySelector('.details_text');
detailsInsert.innerHTML = html2insert_details;