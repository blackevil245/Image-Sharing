/*-------------------- PANEL BUTTON ------------------------*/
$("#uploadButton").click(function (event) {
    event.stopPropagation();
    $("#popupUploadWindow").css("transform", "translateY(0%)");
    $("#popupLoginWindow").css("transform", "translateY(-200%)");
    $("#popupRegisterWindow").css("transform", "translateY(-200%)");
    $("#popupMyAccount").css("transform", "translateY(-200%)");
});

$("#signinButton").click(function (event) {
    event.stopPropagation();
    $("#popupLoginWindow").css("transform", "translateY(0%)");
    $("#popupUploadWindow").css("transform", "translateY(-200%)");
    $("#popupRegisterWindow").css("transform", "translateY(-200%)");
});

$("#myAccountButton").click(function (event) {
    event.stopPropagation();
    $("#popupUploadWindow").css("transform", "translateY(-200%)");
    $("#popupMyAccount").css("transform", "translateY(0%)");
});

$("#register").click(function (event) {
    event.stopPropagation();
    $("#popupRegisterWindow").css("transform", "translateY(0%)");
});

$('.popup-wrapper').click(function (event) {
    event.stopPropagation();
});


/*-------------------- GALLERY ------------------------*/

$("#closeGallery").click(function () {
    $("#gallery").css("visibility", "hidden");
});

$('#gallery').click(function (event) {
    event.stopPropagation();
});

/*-------------------- CLICK DOC CLOSE ------------------------*/
$(document).on('click', function (event) {
    event.stopPropagation();
    $("#popupLoginWindow").css("transform", "translateY(-200%)");
    $("#popupUploadWindow").css("transform", "translateY(-200%)");
    $("#popupRegisterWindow").css("transform", "translateY(-200%)");
    $("#popupMyAccount").css("transform", "translateY(-200%)");
});