    // sign up and login transitions
    $('.sign-up-container').hide();
    $('.sign-in-container').show();
    function addToContainer() {
        $('.sign-in-container').hide();
        $('.sign-up-container').show();
	}
	function removeFromContainer() {
        $('.sign-up-container').hide();
        $('.sign-in-container').show();
	}
    const signUpButton = document.getElementById('signUp');
	const signInButton = document.getElementById('signIn');
	const container = document.getElementById('container');

	signUpButton.addEventListener('click', () => {
        $('.sign-in-container').hide();
        $('.sign-up-container').show();
	});

	signInButton.addEventListener('click', () => {
        $('.sign-up-container').hide();
        $('.sign-in-container').show();

	});
    $('.loginBtn').click(function () {
        $('#log_email_message').hide();
        $('#password_message').hide();  
        
        
    });

    $('.signUpBtn').click(function (e) {
        e.preventDefault();
        $('#n_message').hide();
        $('#user_message').hide();
        $('#pass_message').hide();
        $('#email_message').hide();
        $('#cp_message').hide();

    });


//  Front_End Validataion
    
    // signup  

    $("#submit").click(function (e) { 
        e.preventDefault(false);
        
        check($("#fn").val(), $("#ln").val(), $("#email").val(),
        $("#pass").val(), $("#cp").val())
        
    });

    function check(first_name, last_name , email, pass, cp) {

    console.log(first_name, last_name, email, pass, cp);
    cond1 = true;
    cond3 = true;
    var letters = /^[A-Za-z]+$/;
    console.log(letters);
    if (first_name.length >20  && last_name.length > 20) {
        $('#n_message').html("Names must contain less than 20 words") 
        $('#n_message').show();
        cond1 = false;    }
    else if(!(/^[A-Za-z]+$/.test(first_name)) || !(/^[A-Za-z]+$/.test(last_name))) {
        cond1 = false;
        $('#n_message').html("Name should contain alphabets only!")
        $('#n_message').show();
    }
    else {
        $('#n_message').html("")      
    }
    
    if (email.length < 1) {
        $('#email_message').html("Email field can not be empty ") 
        $('#email_message').show();
        cond3 = false;        }
    else if(!( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        $('#email_message').html("Please enter Valid email! ") 
        $('#email_message').show();
        cond3 = false;     
     }
    else {
        $('#email_message').html("")
    }

    if (pass.length < 6) {
        $('#pass_message').html("Password must contain 6 or more words ")  
        $('#pass_message').show();
        console.log(("here"))
        cond4 = false;       }
    else if (!(/[A-Z]/.test(pass))) {
        
        $('#pass_message').html("Password mustcontain atleast one uppercase letter ")  
        $('#pass_message').show();
        cond4 = false;
    }
    else if (!(/[a-z]/.test(pass))) {
        
        $('#pass_message').html("Password mustcontain atleast one uppercase letter ")  
        $('#pass_message').show();
        cond4 = false;
    }
    else if (!(/[0-9]/.test(pass))) {
        
        $('#pass_message').html("Password mustcontain atleast one decimal number ")  
        $('#pass_message').show();
        cond4 = false;
    }
        else {
            $('#pass_message').html("")      
            cond4 = true; 
                   }              
         
    if (cp != pass ) {
        $('#cp_message').html("Password did not match ") 
        $('#cp_message').show();
        cond5 = false;        }
    else {
        $('#cp_message').html("")      
        cond5 = true;        }

    console.log(cond1 , cond3 ,  cond4 , cond5); 
    if (cond1 && cond3 && cond4 && cond5) {
        $.ajax({
           type: "POST",
           url: "http://127.0.0.1:5000/signup",
           data: {'first_name':first_name,'last_name': last_name , 
           'email':email,'sign_pass': pass, 'c_pass':cp},
           headers: {'Access-Control-Allow-Origin': '*',    },

           success: function (response) {
              console.log(response);
              stats = response['status']

              if ( stats == "fail" ) {
                alert("Email is already taken")
                //  $('#final_message').html("something went wrong ") 
                                 }
              else {
                $('#final_message').html("")                              
                window.location = "/";
                     
                    }         
                                         }
    });       }     }  

    // login   

    $("#log_submit").click(function (e) { 
        e.preventDefault();
        
        check2($("#log_email").val(), $("#password").val(),)
        
    });

    function check2( log_username,  password) {

    console.log( log_username, password);
    
    if (log_username.length < 3) {
        $('#log_email_message').html("Email can not be empty") 
        $('#log_email_message').show();
        log_cond1 = false        }
    else {
        $('#log_email_message').html("")      
        log_cond1 = true        }
    

    if (password.length < 8) {
        $('#password_message').html("Password must not be empty & contain 6 or more words  ") 
        $('#password_message').show();
        log_cond2 = false        }
    else {
        $('#password_message').html("")      
        log_cond2 = true        }

        console.log(log_cond1, log_cond2)

    if (log_cond1 && log_cond2 ) {
        $.ajax({
           type: "POST",
           url: "http://127.0.0.1:5000/login",
           data: {'username': log_username,'password': password },

           success: function (response) {
            stats = response['status']

            if ( stats == "fail" ) {
              alert("Email or Password is Incorrect")
              //  $('#final_message').html("something went wrong ") 
            }
            else {
                $('#final_message').html("")                              
                window.location = "/";
                     
                    }         
        }
    });
    }
     }  

        // if (user_messages != "True" ) {
        //     $('#user_message').html(user_messages) }
        // else {
        //     $('#user_message').html("")        }



        // $("#email").val(), $("#password").val(),

        // sendRequest($("#email").val(), $("#password").val(), $("#device1").is(':checked'),  $("#device2").is(':checked'), $("#device3").is(':checked'), 
        // $("#html").is(':checked'),  $("#css").is(':checked'), $("#javascript").is(':checked')  );  
        
        
    //  function sendRequest(email, password,device1,device2,device3, html,css,javascript) {
    //     
    //  }
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#pass');
  
    togglePassword.addEventListener('click', function (e) {
      // toggle the type attribute
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      // toggle the eye slash icon
      this.classList.toggle('fa-eye-slash');
  });

  const togglePasswordlog = document.querySelector('#togglePasswordlog');
  const passwordlog = document.querySelector('#password');

  togglePasswordlog.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = passwordlog.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordlog.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});


 // function Toggle() {
  //  var temp = document.getElementById("pass");
   // if (temp.type === "password") {
    //    temp.type = "text";
   // }
   // else {
     //   temp.type = "password";
    // }
// }
