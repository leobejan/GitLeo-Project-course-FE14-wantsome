const divToModify = document.querySelector('.usr_details_container');

const loggedIn = JSON.parse(localStorage.getItem('usrLoggedIn'));

if (loggedIn) {
    const loggedUserName = userLoggedIn[1];
    const loggedUserID = userLoggedIn[0];

//get all user details from ls:
const usersFromDB = JSON.parse(localStorage.getItem('users'));
    // console.log(usersFromDB);
const obj = usersFromDB.find(o => o.userID === loggedUserID);


    html2add2div = `<h2>HELLO ${loggedUserName} !</h2> <br/>
<p>Bellow are your details:</p>
<p>username: <b>${obj.username}</b></p>
<p>First Name: <b>${obj.firstName}</b></p>
<p>Last Name: <b>${obj.lastName}</b></p>
<p>Gender: <b>${obj.gender}</b></p>
<p>Email: <b>${obj.email}</b></p>
<button type="submit" onclick="logout()">Log Out</button>
`;
}
else {
    html2add2div = `<h2>HELLO <span class="txtRed">not-logged in</span> user :( </h2> <br/>
    <p>U may want to sign in ?</p>`;
}

divToModify.innerHTML = html2add2div;


function logout() {
    // alert('logout btn pressed');
    localStorage.removeItem('usrLoggedIn');
    location.reload();
}