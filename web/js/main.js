/*global $, jQuery*/

$("#uploadButton").click(function () {
    "use strict";
    $("#popupUploadWindow").css("visibility", "visible");
    $("#popupLoginWindow").css("visibility", "hidden");
});

$("#closeUploadPopup").click(function () {
    "use strict";
    $("#popupUploadWindow").css("visibility", "hidden");
});

$("#signinButton").click(function () {
    "use strict";
    $("#popupLoginWindow").css("visibility", "visible");
    $("#popupUploadWindow").css("visibility", "hidden");
});

$("#closeSigninPopup").click(function () {
    "use strict";
    $("#popupLoginWindow").css("visibility", "hidden");
});

$("#register").click(function () {
    "use strict";
    $("#popupRegisterWindow").css("visibility", "visible");
});

$("#closeRegisterPopup").click(function () {
    "use strict";
    $("#popupRegisterWindow").css("visibility", "hidden");
});

$("#closeGallery").click(function () {
    "use strict";
    $("#gallery").css("visibility", "hidden");
});

var minImgPerRow = 7;
var maxImgPerRow = 9;
var randomNum;
var row;
var count;

$(document).ready(function (i) {
    "use strict";
    //GET IMAGE AJAX
    $.ajax({
        type: 'GET',
        url: 'queryServlet',
        data: {
            get_param: 'value'
        },
        dataType: 'json',
        success: function (responseJson) {
            randomNum = Math.floor(Math.random() * ((maxImgPerRow - minImgPerRow) + 1) + minImgPerRow);
            count = 0;
            i = 1;
            row = 'row' + i;
            $.each(responseJson, function (index, image) {
                if (count <= randomNum) {
                    $('#' + row).append('<div class="item"><img src="http://192.168.56.1/image/' + image.title + '" alt="" onclick="showGallery(this.src)" class="crop-img"></div>');
                    count++;
                } else {
                    i++;
                    row = 'row' + i;
                    randomNum = Math.floor(Math.random() * (maxImgPerRow - minImgPerRow + 1)) + minImgPerRow;
                    count = 0;
                }
            });
        }
    });
});

function showGallery(path) {
    "use strict";
    $("#gallery").css("visibility", "visible");
    $("#galleryImg").attr('src', path);
}