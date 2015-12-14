/*global $, jQuery*/

var minImgPerRow;
var maxImgPerRow;
var randomNum;
var row;
var count;
var jsonFile;

$(document).ready(function () {

    //CHECK LOGIN CACHE
    checkLoginCache();

    //LOGIN FORM RESPONSE AJAX
    $('#loginForm').submit(function (e) {
        $.get($(this).attr("action"), $(this).serialize(), function (data) {
            if (data.substring(0, 8) === 'loggedin') {
                localStorage.setItem("username", $('#username').val());
                localStorage.setItem("password", $('#password').val());
                localStorage.setItem("userid", data.substring(8));
                location.reload();
            } else {
                notify(data);
            };
        });
        return false;
    });

    //REGISTER FORM AJAX RESPONSE
    $('#registerForm').submit(function (e) {
        $.get($(this).attr("action"), $(this).serialize(), function (data) {
            notify(data);
        });
        return false;
    });

    //EXPLORE ALL IMAGE ON START
    queryImage("all");

    //WINDOW RESIZE EVENT
    $(window).resize(function () {
        $('.content-wrapper').empty();
        $('.content-wrapper').append('<div class="row wrapper" id="row0"></div>');
        generateLayout(jsonFile);
    });

    //SIGNOUT
    $('#signOut').click(function () {
        signOut();
    });

    //SHOW MY IMAGE
    $('#showMyImage').click(function () {
        queryImage('user' + localStorage.getItem("userid"));
    });

    //EXPLORE
    $('#exploreButton').click(function () {
        queryImage("all");
    });
    
    $('#file').change(function() {
        $('#owner-id').val(localStorage.getItem("userid"));
    });
});

function checkLoginCache() {
    var username = localStorage.getItem('username');
    var password = localStorage.getItem('password');
    if (username !== null && password !== null) {
        $('#signinButton').remove();
        $('#myAccountButton').css({
            visibility: "visible",
            minWidth: "33%",
            maxWidth: "33%"
        });
    };
}

function queryImage(query) {
    $('.content-wrapper').empty();
    $('.content-wrapper').append('<div class="row wrapper" id="row0"></div>');
    $.ajax({
        type: 'GET',
        url: 'queryServlet',
        data: {
            query_word: query
        },
        dataType: 'json',
        success: function (responseJson) {
            jsonFile = responseJson;
            console.log(responseJson);
            generateLayout(jsonFile);
        }
    });
}

function detectClientWidth() {
    var clientWidth = document.documentElement.clientWidth;
    if (clientWidth >= 0 && clientWidth <= 600) {
        minImgPerRow = 1;
        maxImgPerRow = 1;
    } else if (clientWidth >= 601 && clientWidth <= 800) {
        minImgPerRow = 2;
        maxImgPerRow = 2;
    } else if (clientWidth >= 801 && clientWidth <= 1000) {
        minImgPerRow = 2;
        maxImgPerRow = 3;
    } else if (clientWidth >= 1001 && clientWidth <= 1300) {
        minImgPerRow = 4;
        maxImgPerRow = 4;
    } else if (clientWidth >= 1301 && clientWidth <= 1600) {
        minImgPerRow = 4;
        maxImgPerRow = 5;
    } else if (clientWidth >= 1601) {
        minImgPerRow = 5;
        maxImgPerRow = 5;
    }
    console.log(clientWidth);
    console.log(minImgPerRow);
    console.log(maxImgPerRow);
};

function generateLayout(responseJson) {
    detectClientWidth();
    randomNum = Math.floor(Math.random() * ((maxImgPerRow - minImgPerRow) + 1) + minImgPerRow);
    count = 0;
    var i = 0;
    row = 'row' + i;
    $.each(responseJson, function (index, image) {
        if (count < randomNum) {
            $('#' + row).append('<div class="item"><img src="http://192.168.56.1/image/' + image.imagePath + '" alt="" onclick="showGallery(this)" class="crop-img" data-date="' + image.dateCreated + '" data-title="' + image.title + '"><div class="item-overlay"><p>' + image.title + '</p></div></div>');
            count++;
        } else {
            i++;
            row = 'row' + i;
            $('.content-wrapper').append('<div class="row wrapper" id="' + row + '"></div>');
            randomNum = Math.floor(Math.random() * (maxImgPerRow - minImgPerRow + 1)) + minImgPerRow;
            count = 0;
        };
    });
};

function notify(message) {
    $('#notification-text').text(message);
    $('.notification').css('bottom', '20px');
    window.setTimeout(function () {
        $('.notification').css('bottom', '-200%');
    }, 2500);
};

function showGallery(obj) {
    $("#gallery").css("visibility", "visible");
    $("#galleryImg").attr('src', $(obj).attr('src'));
    $("#title").text($(obj).attr('data-title'));
    $("#image-date").text($(obj).attr('data-date'));
};

function signOut() {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("userid");
    location.reload();
};