function signUpModalFn() {

  var myInput = document.getElementById("psw");
  var confirmMyInput = document.getElementById("cpsw");
  var letter = document.getElementById("letter");
  var capital = document.getElementById("capital");
  var number = document.getElementById("number");
  var symbol = document.getElementById("symbol");
  var length = document.getElementById("length");
  var match = document.getElementById("match");

  var userName = document.getElementById("username");
  var firstName = document.getElementById("firstName");
  var lastName = document.getElementById("lastName");
  var myBdayInput = document.getElementById("bday");
  var year = document.getElementById("year");


  myBdayInput.onkeyup = function () {

    // Validate birthyear
    if (myBdayInput.value < 20020101 && myBdayInput.value.length == 8) {
      year.classList.remove("invalid");
      year.classList.add("valid");
      console.log(year.classList);
    } else {
      year.classList.remove("valid");
      year.classList.add("invalid");
      console.log(year.classList);
    }
  }

  // When the user starts to type something inside the password field
  myInput.onkeyup = function () {
    console.log("helllooo");

    var lowerCaseLetters = /[a-z]/g; // regular expression for lowerCaseLetters
    var upperCaseLetters = /[A-Z]/g; // regular expression for upperCaseLetters
    var numbers = /[0-9]/g; // regular expression for digits
    var symbols = /\W/g; // regular expression for symbols
    var minLength = 12; // minimum length

    // Validate lowercase letters
    if (myInput.value.match(lowerCaseLetters)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }

    // Validate capital letters
    if (myInput.value.match(upperCaseLetters)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }

    // Validate numbers
    if (myInput.value.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }

    // Validate symbols
    if (myInput.value.match(symbols)) {
      symbol.classList.remove("invalid");
      symbol.classList.add("valid");
    } else {
      symbol.classList.remove("valid");
      symbol.classList.add("invalid");
    }

    // Validate length
    if (myInput.value.length >= minLength) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }

  };;

  confirmMyInput.onkeyup = function () {
    // Validate password and confirmPassword
    var pmatch;
    if(myInput.value == confirmMyInput.value)
    {
      pmatch = true;
    }

    else{
      pmatch = false;
    }
    var passEqualsConfPass = pmatch; // password equals the text in confirm password
    if (passEqualsConfPass) {
      match.classList.remove("invalid");
      match.classList.add("valid");
    } else {
      match.classList.remove("valid");
      match.classList.add("invalid");
    }

    // Disable or Enable the button based on the elements in classList
    enableButton(year, letter, capital, number, length, match);
  };
}

function loginModalFn() {
  var username = document.getElementById('username');
  var password = document.getElementById('psw');
}

function enableButton(year, letter, capital, number, length, match) {

  var result = false;
  if(year.classList.contains("valid") && letter.classList.contains("valid") && capital.classList.contains("valid") && number.classList.contains("valid") && length.classList.contains("valid") && match.classList.contains("valid"))
  {
    result = true;
  }
  else{
    result = false;
  }
  var button = document.getElementById("my_submit_button");
  var condition = result;
  if (condition) {
    button.disabled = false;
  }
  else{
    button.disabled = true;
  }
}

function onClickFunction() {
  alert("Hey! I'm all green! Well done.");
}
