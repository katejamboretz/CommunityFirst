//References to page elements for User Login
var email = $("#email");
var username = $("#username");
var password = $("#password");
var submitLogin = $("#submitLogin");

//References to page elements for Create Login
var newEmail = $("#newEmail");
var newUsername = $("#newUsername");
var newPassword = $("#newPassword");
var submitCreate = $("#submitCreate");

//API object for each request method
var API = {
  saveUser: function(User) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/users",
      data: JSON.stringify(User)
    });
  },
  getUser: function() {
    return $.ajax({
      type: "GET",
      url: "/api/users"
    });
  }
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleCreateLogin = function(User) {
  event.preventDefault();

  var User = {
    userName: newUsername.val().trim(),
    password: newPassword.val().trim(),
    email: newEmail.val().trim()

    // need to figure out user id
  };
  console.log(User);

  if (!(User.userName && User.password && User.email)) {
    alert("You must complete all fields before creating Login!");
    return;
  }

  API.saveUser(User).then(function() {
    // return;
  });

  newUsername.val(""), newPassword.val(""), newEmail.val("");
};

submitCreate.on("click", handleCreateLogin);
