//******************* verify form with Constraint Validation API

/* const emailField = document.querySelector('#frmEmail');
// console.log("emailField", emailField);
 emailField.addEventListener("input", () => {
  emailField.setCustomValidity("");
  emailField.checkValidity();
  console.log('check: ', emailField.checkValidity());
});

emailField.addEventListener("invalid", () => {
  emailField.setCustomValidity("Email field is NOT OK");
}); */


//******************* verify entire form
const submit = document.querySelector("input[type=submit]");
// console.log("submit", submit);
submit.addEventListener("click", validate);

function validate(e) {
    e.preventDefault();
    const msgErrAccumulator = [];

    const emailField = document.querySelector('#frmEmail');
    const pwdField = document.querySelector('#frmPasswd');
    // console.log("emailField", emailField);
    let valid = true;

    if (!emailField.value) {
        msgErrAccumulator.push('Email field is empty');
    }

    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailField.value.match(mailformat)) {
        msgErrAccumulator.push('wrong Email format');
    }



    const usersFromDB = JSON.parse(localStorage.getItem('users'));
    // console.log(usersFromDB);
    const obj = usersFromDB.find(o => o.email === emailField.value);
    // console.log('obj', obj);
    if (obj == undefined) {
        msgErrAccumulator.push('No user in database :(');
    } else {
        //check password
        const pwd = obj.passwd;
        // console.log('pwd: ESTE: ' + pwd + ' pwdField: ' + pwdField.value);
        if (pwd !== pwdField.value) {
            msgErrAccumulator.push('Password for this user is not correct');
        }
        else {
            //if pwd is ok we log in the user and redirect
            const userToWriteInStorage = JSON.stringify([obj.userID, obj.username]);
            localStorage.setItem('usrLoggedIn', userToWriteInStorage);
            window.location.href = "/";
        }
    }



    // console.log("msgErrAccumulator ESTE: ", msgErrAccumulator);

    if (msgErrAccumulator.length !== 0) {
        const holderForError = document.getElementById("holderForError");
        holderForError.classList.add("visible");
        emailField.classList.add("invalid");
        holderForError.setAttribute("aria-hidden", false);
        holderForError.setAttribute("aria-invalid", true);

        let html2add = '';
        for (const element of msgErrAccumulator) {
            const elemPar = `<p>${element}</p>`;
            html2add += elemPar;
          }
          holderForError.innerHTML = html2add;
    }




    // console.log("valid ESTE: ", valid);
    return valid;
}


