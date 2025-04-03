//access html element

let usernameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");
let loginBtn = document.getElementById("log-in-btn");
let form = document.getElementById("form");

//log-in operation

loginBtn.addEventListener("click", (evt) => {
  let username = usernameInput.value;
  let password = passwordInput.value;

  let arr = JSON.parse(localStorage.getItem("usersdata"));

  //validate username and password to local stored user info
  if (arr != null) {
    let matchData = arr.filter((data) => {
      return data["user"] == username;
    });
    //match username
    if (matchData.length < 1) {
      evt.preventDefault();
      alert("username not found");
      window.location.href = "./login.html";
    } else if (matchData[0]["userData"]["password"] != password) {
      //match password
      evt.preventDefault();
      alert("password not match");
      window.location.href = "./login.html";
    } else {
      evt.preventDefault();
      //call signIn function for user authentication
      signin(username);

      window.location.href = `../todoList/todo.html?username=${username}`;
    }
  } else {
    alert("please sign-up...");
  }

  console.log("hello");
});

//user signin functionn
function signin(username) {
  // let logged = JSON.parse(localStorage.getItem("logins"));
  // if (logged != null) {
  //   let logArr = [...logged];
  //   let idx = logArr.indexOf(username);
  //   if (idx == -1) {
  //     logArr.push(username);
  //     localStorage.setItem("logins", JSON.stringify(logArr));
  //     console.log("log in");
  //   }
  // } else {
  //   let logArr = [username];
  //   localStorage.setItem("logins", JSON.stringify(logArr));
  //   console.log("log in");
  // }
  let logArr = [username];
    localStorage.setItem("logins", JSON.stringify(logArr));
}
