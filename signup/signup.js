//access html element

let usernameInput = document.getElementById("username");
let emailInput = document.getElementById("email");
let submitBtn = document.getElementById("submitBtn");
let passwordInput = document.getElementById("password");
let form = document.getElementById("form");
let userdata = JSON.parse(localStorage.getItem("usersdata"));



let userArr = [];
userdata ? (userArr = [...userdata]) : (userArr = []);
if (!submitBtn.disabled) {
  submitBtn.addEventListener("click", () => {
    console.table({
      username: usernameInput.value,
      email: emailInput.value,

      password: passwordInput.value,
    });
  });
}

//validation for username and styling

usernameInput.addEventListener("input", function (evt) {
  let pattern = /^[\D+]/;
  let condition = pattern.test(usernameInput.value.trim());
  if (!condition || usernameInput.value.trim().length < 1) {
    this.nextElementSibling.innerText = " invalid name,retry!";
    this.nextElementSibling.style.color = "red";
    this.style.border = "2px solid red";
  } else {
    this.nextElementSibling.innerText = "valid name";
    this.nextElementSibling.style.color = "green";
    this.style.border = "2px solid green";
  }
});

//validation for email and styling


emailInput.addEventListener("change", function (evt) {
  let pattern = /^[\w.]+@[\w.-]+\.[a-zA-Z]{2,}$/;
  let condition = pattern.test(emailInput.value.trim());
  if (!condition || emailInput.value.trim().length < 1) {
    this.nextElementSibling.innerText = "invalid email,retry!";
    this.nextElementSibling.style.color = "red";
    this.style.border = "2px solid red";
  } else {
    this.nextElementSibling.innerText = "valid email";
    this.nextElementSibling.style.color = "green";
    this.style.border = "2px solid green";
  }
});

//validation for password and styling

passwordInput.addEventListener("input", function (evt) {
  if (passwordInput.value.trim().length < 8) {
    this.nextElementSibling.innerText =
      "password minimum 8 character length,retry!";
    this.nextElementSibling.style.color = "red";
    this.style.border = "2px solid red";
  } else {
    this.nextElementSibling.innerText = "strong password";
    this.nextElementSibling.style.color = "green";
    this.style.border = "2px solid green";
  }
});


//form submition event

form.addEventListener("submit", (evt) => {
  let namePattern = /^[\D+]/;
  let nameTest = namePattern.test(usernameInput.value.trim());
  let nameConditon = !nameTest || usernameInput.value.trim().length < 1;
  let emailPattern = /^[\w.]+@[\w.-]+\.[a-zA-Z]{2,}$/;
  let emailTest = emailPattern.test(emailInput.value.trim());
  let emailCondition = !emailTest || emailInput.value.trim().length < 1;
  let passwordCondition = passwordInput.value.length < 8;

  if (nameConditon || emailCondition || passwordCondition) {
    evt.preventDefault();
  } else {
    //check existance of user
    
    let alreadyExist = userArr.some((users) => {
      return users["user"] == usernameInput.value;
    });
    if (!alreadyExist) {
      userArr.push({
        user: usernameInput.value,
        userData: {
          username: usernameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
        },
      });

      // store user information in local storage

       localStorage.setItem("usersdata", JSON.stringify(userArr));

      alert("account created");
      window.location.href = "../login/login.html";
    } else {
      alert("user already exist");
      window.location.href = "./signup.html";
    }
    console.log(userArr);
  }
});
