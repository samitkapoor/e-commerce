var hideError = (element) => {
  element.innerHTML = "";
  element.classList.add("hidden");
};

var showError = (element, msg) => {
  element.innerHTML = msg;
  element.classList.remove("hidden");
};

var validateForm = () => {
  var location = window.location.href.split("/");
  var isSignUp = location[location.length - 1].startsWith("sign-up");

  if (isSignUp) {
    const name = document.getElementById("name");
    var errorName = document.getElementById("errorName");
    const email = document.getElementById("email");
    var errorEmail = document.getElementById("errorEmail");
    const password = document.getElementById("password");
    var errorPassword = document.getElementById("errorPassword");
    const confirmPassword = document.getElementById("confirmPassword");
    var errorConfirmPassword = document.getElementById("errorConfirmPassword");

    if (name.value.length == 0) {
      showError(errorName, "Name can't be empty");
      return false;
    } else {
      hideError(errorName);
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
      showError(errorEmail, "Please enter a valid email");
      return false;
    } else {
      hideError(errorEmail);
    }

    if (password.value.length == 0) {
      showError(errorPassword, "Create a new password");
      return false;
    } else if (password.value.length < 6) {
      showError(errorPassword, "Password should be of length 6 atleast");
      return false;
    } else {
      hideError(errorPassword);
    }

    if (confirmPassword.value != password.value) {
      showError(errorConfirmPassword, "Passwords do not match");
      return false;
    } else {
      hideError(errorConfirmPassword);
    }
  } else {
    const email = document.getElementById("email");
    var errorEmail = document.getElementById("errorEmail");
    const password = document.getElementById("password");
    var errorPassword = document.getElementById("errorPassword");

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
      showError(errorEmail, "Please enter a valid email");
      return false;
    } else {
      hideError(errorEmail);
    }

    if (password.value.length == 0) {
      showError(errorPassword, "Password can't be empty");
      return false;
    } else if (password.value.length < 6) {
      showError(errorPassword, "Incorrect Password");
      return false;
    } else {
      hideError(errorPassword);
    }
  }
  return true;
};
