$("#cf-submit").click(function (e) {
  e.preventDefault(false);
  $('#n_message').hide();
  $('#email_message').hide();
  $('#phone_message').hide();
  $('#message_message').hide();
  check($("#name").val(), $("#email").val(), $("#phone").val(), $("#message").val())

});

function check(name, email, phone, message) {
  let cond1, cond2, cond3, cond4;
  // Validation for name field
  if (name.length < 1) {
    $('#n_message').html("Name cannot be empty")
    cond1 = false
  } else if (name.length > 20) {
    $('#n_message').html("Name must contain less than 20 characters")
    cond1 = false
  } else if (!(/^[A-Za-z ]+$/.test(name))) {
    $('#n_message').html("Name should contain alphabets only!")
    cond1 = false
  } else {
    $('#n_message').html("")
    cond1 = true
  }

  // Validation for email field
  if (email.length < 1) {
    $('#email_message').html("Email field cannot be empty ")
    cond2 = false
  } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
    $('#email_message').html("Please enter a valid email address! ")
    cond2 = false
  } else {
    $('#email_message').html("")
    cond2 = true
  }

  // Validation for phone field
  if (phone.length < 1) {
    $('#phone_message').html("Phone field cannot be empty ")
    cond3 = false
  } else {
    $('#phone_message').html("")
    cond3 = true
  }

  // Validation for message field
  if (message.length < 1) {
    $('#message_message').html("Message field cannot be empty ")
    cond4 = false
  } else {
    $('#message_message').html("")
    cond4 = true
  }

  if (cond1 && cond2 && cond3 && cond4) {
    // Send data to server
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:5000/save_contact",
      data: { 'email': email, 'name': name, 'phone': phone, 'message': message },
      headers: { 'Access-Control-Allow-Origin': '*', },
      success: function (response) {
        stats = response['status']

        if (stats == "pass") {
          const form = document.getElementById('appointment-form');
          form.reset();
          const popup = document.createElement('div');
          popup.innerHTML = 'Thank you for submitting our contact form, we will get back to you shortly.';
          popup.style.position = 'fixed';
          popup.style.top = '50%';
          popup.style.left = '50%';
          popup.style.transform = 'translate(-50%, -50%)';
          popup.style.padding = '20px';
          popup.style.background = '#fff';
          popup.style.border = '1px solid #ccc';
          popup.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
          popup.style.zIndex = '9999';
          document.body.appendChild(popup);
          setTimeout(() => {
            popup.remove();
          }, 3000);
          
        }
      }
    });
  } else {
    $('#n_message').show();
    $('#email_message').show();
    $('#phone_message').show();
    $('#message_message').show();
  }
}
