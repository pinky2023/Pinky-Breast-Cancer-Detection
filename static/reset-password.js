$('#op_message').hide();
$('#password_message').hide();
$('#cp_message').hide();

$("#reset").click(function (e) {
  e.preventDefault();

  check2($("#email").val(), $("#op").val(), $("#password").val(), $("#cp").val(),)

});

function check2(username, old_password, new_password, confirm_pass) {
  console.log(username);
  if (old_password.length < 6) {
    $('#op_message').html("Password must not be empty & contain 6 or more words  ")
    $('#op_message').show();
    log_cond1 = false
  }
  else {
    $('#op_message').html("")
    log_cond1 = true
  }


  if (new_password.length < 6) {
    $('#password_message').html("Password must not be empty & contain 6 or more words  ")
    $('#password_message').show();
    log_cond2 = false
  }
  else if (!(/[A-Z]/.test(new_password))) {

    $('#password_message').html("Password mustcontain atleast one uppercase letter ")
    $('#password_message').show();
    log_cond2 = false
  }
  else if (!(/[a-z]/.test(new_password))) {

    $('#password_message').html("Password mustcontain atleast one uppercase letter ")
    $('#password_message').show();
    log_cond2 = false
  }
  else if (!(/[0-9]/.test(new_password))) {

    $('#password_message').html("Password mustcontain atleast one decimal number ")
    $('#password_message').show();
    log_cond2 = false
  }
  else {
    $('#password_message').html("")
    log_cond2 = true
  }

  if (confirm_pass != new_password) {
    $('#cp_message').html("Password did not match ")
    $('#cp_message').show();
    log_cond3 = false
  }
  else {
    $('#cp_message').html("")
    log_cond3 = true
  }



  console.log(log_cond1, log_cond2, log_cond3)
  if (log_cond1 && log_cond2 && log_cond3) {
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:5000/change_password",
      data: { 'username': username, 'old_password': old_password, 'new_password': new_password },
      headers: {'Access-Control-Allow-Origin': '*',    },
      success: function (response) {
        stats = response['status']

        if (stats == "fail") {
          alert("Username or Password is Incorrect")
        }
        else {
          $('#final_message').html("")
          window.location = "/";

        }
      }
    });
  }
}

const togglePasswordlog = document.querySelector('#togglePasswordlog');
const passwordlog = document.querySelector('#password');

togglePasswordlog.addEventListener('click', function (e) {
  // toggle the type attribute
  const type = passwordlog.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordlog.setAttribute('type', type);
  // toggle the eye slash icon
  this.classList.toggle('fa-eye-slash');
});

