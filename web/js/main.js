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

var minImgPerRow = 7;
var maxImgPerRow = 9;
var randomNum = Math.floor(Math.random() * (maxImgPerRow - minImgPerRow + 1)) + minImgPerRow;

$(document).ready(function (i) {
    "use strict";
    for (i = 1; i <= randomNum; i = i + 1) {
        $(".row").append('<div id="created_div"></div>');
    }
});