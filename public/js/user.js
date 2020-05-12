//API object for each request method
var API = {
  saveUser: function(User) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/userCreate",
      data: JSON.stringify(User),
      error: function(error) {
        if (error.responseText === "createAlert") {
          alert("Username already exists.");
        }
      }
    });
  },

  getUser: function(User) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/userLogin",
      data: JSON.stringify(User),
      error: function(error) {
        if (error.responseText === "passwordAlert") {
          alert("Please enter correct password.");
        } else if (error.responseText === "userAlert") {
          alert("Please enter correct username.");
        }
      }
    });
  }
};

//References to page elements for Create Login
var newUsername = $("#newUsername");
var newPassword = $("#newPassword");
var newEmail = $("#newEmail");
var submitCreate = $("#submitCreate");

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleCreateLogin = function(User) {
  event.preventDefault();

  var User = {
    userName: newUsername.val().trim(),
    password: newPassword.val().trim(),
    email: newEmail.val().trim()
  };
  // console.log(User);

  if (!(User.userName && User.password && User.email)) {
    alert("You must complete all fields before creating Login!");
    return;
  }

  API.saveUser(User).then(function() {
    window.location.replace("/Users");
  });

  newUsername.val(""), newPassword.val(""), newEmail.val("");
};

submitCreate.on("click", handleCreateLogin);

//References to page elements for User Login
var username = $("#username");
var password = $("#password");
var email = $("#email");
var submitLogin = $("#submitLogin");

var handleUserLogin = function(User) {
  event.preventDefault();

  var User = {
    userName: username.val().trim(),
    password: password.val().trim(),
    email: email.val().trim()
  };
  // console.log(User);

  if (!(User.userName && User.password && User.email)) {
    alert("You must complete all fields before creating Login!");
    return;
  }

  API.getUser(User).then(function() {
    window.location.replace("/event-create");
  });

  username.val(""), password.val(""), email.val("");
};

submitLogin.on("click", handleUserLogin);
