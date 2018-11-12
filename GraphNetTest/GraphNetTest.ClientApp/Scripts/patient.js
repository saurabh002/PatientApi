var self = this;

// get patients records
function getData() {
    //display patient table
    var xmldata = "<table class=\"table table-bordered table-condensed table-striped table-hover sortable\"><tr class=\"danger\">" +
    "<th>First Name</th><th>Last Name</th><th>Gender</th><th>Date of Birth</th></tr>";

    var self = this;
    $.ajax({
        url: 'http://' + $(location).attr('host') + '/api/patient/getall',
        type: 'GET',
        dataType: 'xml',
        success: function (xml) {
            $(xml).find("Patient").each(function () {
                var foreName = $(this).find('FirstName').text();
                var surname = $(this).find('LastName').text();
                var gender = $(this).find('Gender').text();
                //Formatting date of birth
                var date = new Date($(this).find('DateOfBirth').text());
                var month = 1 + date.getMonth();
                xmldata += "<tr><td>" + foreName + "</td><td>" + surname + "</td><td>" + gender + "</td><td>" + month + "/" + date.getDate() + "/" + date.getFullYear() + "</td></tr>";
            });
            xmldata += "</table>";
            $("#tblContainer").html(xmldata);
        }
    })
     .fail(
     function (xhr, textStatus, err) {
         $("#ResponseMsg").html(err);
     });
};

//var self = this;
// Validating phone numbers
function PhoneValidate(input) {
    var regEx = /^\[0-9]\\d{9}$/;
    if (regEx.test(input))
        return true;
    else return false;

};

//Submit request
function SubmitForm() {
    var firstName = $('#FirstName').val();
    var lastName = $('#LastName').val();
    var gender = $('#Gender').val();
    var birthDate = $('#DateofBirth').val();
    var homeNumber = $('#HomeNumber').val();
    var workNumber = $('#WorkNumber').val();
    var mobileNumber = $('#MobileNumber').val();

    if (!(firstName && FirstName.length >= 2 && firstName.length <= 50))
    { $("#FirstNameMsg").html("First name should be between 2 to 50 characters"); return } else { $("#FirstNameMsg").empty(); }

    if (!(lastName && lastName.length >= 2 && lastName.length <= 50))
    { $("#LastNameMsg").html("Last name between 2 to 50 characters"); return; } else $("#LastNameMsg").empty();

    if (!(gender && gender != 'SelectGender'))
    { $("#GenderMsg").html("Please select Gender"); return; } else $("#GenderMsg").empty();

    if (!birthDate)
    { $("#DateofBirthMsg").html("Invalid date of birth"); return; } else $("#DateofBirthMsg").empty();
    if (homeNumber) {
        if (!self.PhoneValidate(homeNumber))
        { $("#HomeNumberMsg").html("Only numeric value is allowed"); return; } else $("#HomeNumberMsg").empty();
    }
    if (workNumber) {
        if (!self.PhoneValidate(workNumber))
        { $("#WorkNumberMsg").html("Only numeric value is allowed"); return; } else $("#WorkNumberMsg").empty();
    }

    if (mobileNumber) {
        if (!self.PhoneValidate(mobileNumber))
        { $("#MobileNumberMsg").html("Only numeric value is allowed"); return; } else $("#MobileNumberMsg").empty();
    }

    var xmlData = "<Patient><FirstName>" + $('#FirstName').val() + "</FirstName>" + "<LastName>" + $('#LastName').val() + "</LastName>" + "<Gender>" + $('#Gender').val() + "</Gender>" + "<DateofBirth>" + $('#DateofBirth').val() + "</DateofBirth><Phone><HomeNumber>" + $('#HomeNumber').val() + "</HomeNumber>" + "<WorkNumber>" + $('#WorkNumber').val() + "</WorkNumber>" + "<MobileNumber>" + $('#MobileNumber').val() + "</MobileNumber></Phone></Patient>";
    // Sending data to api
    $.ajax({
        url: 'http://' + $(location).attr('host') + '/api/patient/add',
        cache: false,
        type: 'POST',
        contentType: 'text/xml',
        data: xmlData,
        statusCode: {
            200: function (data) {
                $("#ResponseMsg").html(data);
            }
        }
    })
     .fail(
     function (xhr, textStatus, err) {
         $("#ResponseMsg").html(err);
     });
}