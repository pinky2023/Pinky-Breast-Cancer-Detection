var acceptedCreditCards = {
  visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
  mastercard: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
  amex: /^3[47][0-9]{13}$/,
  discover: /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/,
  diners_club: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
  jcb: /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/,
  test_visa: /^4(018|1750|3[047])(\d{8}|\d{12})$/,
  test_mastercard: /^5[0-9]{15}|222[1-9][0-9]{12}|2[3-6][0-9]{14}|27[0-1][0-9]{13}|2720[0-9]{12}$/,
  test_amex: /^3[47][0-9]{13}|(34|37)0000[0-9]{11}$/,
  test_discover: /^6011[0-9]{12}|65[0-9]{14}|64[4-9][0-9]{13}|62[2-8][0-9]{13}|(60110001[0-5]|6440000|65900[0-9]{2})[0-9]{10}$/,
  test_diners_club: /^30[0-5][0-9]{11}|(5[4-5]|(309|36|38)[0-9]{2})[0-9]{12}|(6011|6500|622)[0-9]{12}|(300|301|302|303|304|305|36|38)[0-9]{11}|(54|55)[0-9]{14}$/,
  test_jcb: /^35(28|29|[3-8][0-9])[0-9]{12}$/,
};
// Visa: 4012888888881881
// Mastercard: 5555555555554444
// Amex: 378282246310005
// Discover: 6011111111111117
// Diners Club: 30569309025904
// JCB: 3530111333300000
  
  $('#cvv').attr('maxlength', 4);
  
function validateExpiryDate(exp_date) {
  var exp_date_regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/; // matches MM/YY format
  var today = new Date();
  var exp_date_array = exp_date.match(exp_date_regex);

  if (!exp_date_array) {
    return false; // invalid format
  }

  var exp_month = parseInt(exp_date_array[1]);
  var exp_year = parseInt(exp_date_array[2]);

  if (exp_month < 1 || exp_month > 12) {
    return false; // invalid month
  }

  var card_expiry = new Date(exp_year + 2000, exp_month, 0); // set to last day of expiry month

  if (card_expiry < today) {
    return false; // card is expired
  }

  return true;
}


  function validateCard(value) {
    // remove all non digit characters
    var value = value.replace(/\D/g, '');
    var sum = 0;
    var shouldDouble = false;
    // loop through values starting at the rightmost side
    for (var i = value.length - 1; i >= 0; i--) {
      var digit = parseInt(value.charAt(i));
  
      if (shouldDouble) {
        if ((digit *= 2) > 9) digit -= 9;
      }
  
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    
    var valid = (sum % 10) == 0;
    var accepted = false;
    
    // loop through the keys (visa, mastercard, amex, etc.)
    Object.keys(acceptedCreditCards).forEach(function(key) {
      var regex = acceptedCreditCards[key];
      if (regex.test(value)) {
        accepted = true;
      }
    });
    
    return valid && accepted;
  }
  
  function validateCVV(cvv,creditCard) {
    // remove all non digit characters
    var creditCard = creditCard.replace(/\D/g, '');
    var cvv = cvv.replace(/\D/g, '');
    console.log(cvv)
    
    // allow 3 or 4 digit CVV for all cards
    if ((/^\d{3,4}$/).test(cvv)) {
      return true;
    }
    
    return false;
  }
  //  	3566000020000410
  //  123
  

  $("#cf-submit").click(function (e) { 
    e.preventDefault();
    $('#n_message').hide();
    $('#card_message').hide();
    $('#email_message').hide();
    $('#don_message').hide();
    check($("#name").val(), $("#email").val(),)
  });

  function check(name , email) {

  if (name.length < 1 ) {
      $('#n_message').html("Name can not be empty") 
      cond1 = false    }

  else if (name.length >20 ) {
    $('#n_message').html("Names must contain less than 20 words") 
   
    cond1 = false    }
  else if(!(/^[A-Za-z ]+$/.test(name)) || !(/^[A-Za-z ]+$/.test(name))) {
    cond1 = false
    $('#n_message').html("Name should contain alphabets only!")
}
  else {
    $('#n_message').html("")    
    cond1= true }

    if (email.length < 1) {
        $('#email_message').html("Email field can not be empty ") 
       
        cond2 = false        }
    else if(!( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        $('#email_message').html("Please enter Valid email! ") 
        cond2 = false     }
    else {
        $('#email_message').html("")
        cond2 = true }
      console.log(validateCard($('#cc').val()));
      console.log(validateCVV($('#cvv').val(), $('#cc').val()))
    if (validateCard($('#cc').val()) && validateCVV($('#cvv').val(), $('#cc').val())) {
      $('#card_message').html("")
      cond3 = true;
    } else {
      $('#card_message').html("Please enter valid Card Number and CVV.")
      cond3 = false;
    }

    if (!document.getElementById('data_5_0').checked && !document.getElementById('data_5_1').checked && !document.getElementById('data_5_2').checked && !document.getElementById('data_5_3').checked ) {
      $('#don_message').html("Donation Amount is required!") 
      cond4 = false}

    else {
     $('#don_message').html("")
      cond4 = true} 
      
  var exp_date_input = document.getElementById('exp_date');
  var exp_date_value = exp_date_input.value;
  cond5 = validateExpiryDate(exp_date_value)
  if (!cond5) {
    $('#card_message').html("Please enter Valid Expiry Date")
  }
           
  if (cond1 && cond2 && cond3 && cond4 && cond5) {
    var value;
    var radios = document.getElementsByName('data_5');
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        value = radios[i].value;
        break;
      }
    }
    var cc = $('#cc').val();
    var cvv = $('#cvv').val();
    console.log(email,name,cc,cvv,exp_date_value,value);
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:5000/save_donation",
      data: { 'email': email, 'name': name, 'card': cc, 'cvv': cvv, 'expiry_date': exp_date_value, 'amount': value },
      headers: { 'Access-Control-Allow-Origin': '*', },
      success: function (response) {
        stats = response['status']

        if (stats == "pass") {
          const form = document.getElementById('donation-form');
          form.reset();
          const popup = document.createElement('div');
          popup.innerHTML = 'Thank you for your generous donation. It will help us continue our vital research against breast cancer.';
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
  }
  else {
    $('#n_message').show();
    $('#card_message').show();
    $('#email_message').show();
    $('#don_message').show();
  }
}
