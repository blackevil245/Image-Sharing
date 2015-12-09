$("#uploadButton").click(function (event) {
    event.stopPropagation();
    $("#popupUploadWindow").css("transform", "translateY(0%)");
    $("#popupLoginWindow").css("transform", "translateY(-200%)");
    $("#popupRegisterWindow").css("transform", "translateY(-200%)");
});

$("#signinButton").click(function (event) {
    event.stopPropagation();
    $("#popupLoginWindow").css("transform", "translateY(0%)");
    $("#popupUploadWindow").css("transform", "translateY(-200%)");
    $("#popupRegisterWindow").css("transform", "translateY(-200%)");
});

$("#register").click(function (event) {
    event.stopPropagation();
    $("#popupRegisterWindow").css("transform", "translateY(0%)");
});

$('.popup-wrapper').click(function (event) {
    event.stopPropagation();
});

$(document).on('click', function (event) {
    $("#popupLoginWindow").css("transform", "translateY(-200%)");
    $("#popupUploadWindow").css("transform", "translateY(-200%)");
    $("#popupRegisterWindow").css("transform", "translateY(-200%)");
});

$("#closeGallery").click(function () {
    $("#gallery").css("visibility", "hidden");
});