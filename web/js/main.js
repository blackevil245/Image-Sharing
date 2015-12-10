/*global $, jQuery*/

var minImgPerRow;
var maxImgPerRow;
var randomNum;
var row;
var count;
var jsonFile;

$(document).ready(function () {

    //LOGIN FORM RESPONSE AJAX
    $('#loginForm').submit(function (e) {
        $.get($(this).attr("action"), $(this).serialize(), function (data) {
            notify(data);
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

    //GET IMAGE AJAX

    $.ajax({
        type: 'GET',
        url: 'queryServlet',
        data: {
            get_param: 'value'
        },
        dataType: 'json',
        success: function (responseJson) {
            jsonFile = responseJson;
            console.log(responseJson);
            generateLayout(jsonFile);
        }
    });

    //WINDOW RESIZE EVENT
    $(window).resize(function () {
        $('.content-wrapper').empty();
        $('.content-wrapper').append('<div class="row wrapper" id="row1"></div>');
        generateLayout(jsonFile);
    });
});

function detectClientWidth() {
    var clientWidth = document.documentElement.clientWidth;
    if (clientWidth <= 600) {
        minImgPerRow = 1;
        maxImgPerRow = 2;
    } else if (clientWidth <= 800) {
        minImgPerRow = 2;
        maxImgPerRow = 3;
    } else if (clientWidth <= 1000) {
        minImgPerRow = 4;
        maxImgPerRow = 5;
    } else if (clientWidth <= 1600) {
        minImgPerRow = 4;
        maxImgPerRow = 6;
    } else {
        minImgPerRow = 5;
        maxImgPerRow = 7;
    }
    console.log(clientWidth);
    console.log(minImgPerRow);
    console.log(maxImgPerRow);
};

function generateLayout(responseJson) {
    detectClientWidth();
    randomNum = Math.floor(Math.random() * ((maxImgPerRow - minImgPerRow) + 1) + minImgPerRow) - 1;
    count = 0;
    var i = 1;
    row = 'row' + i;
    $.each(responseJson, function (index, image) {
        if (count <= randomNum) {
            $('#' + row).append('<div class="item"><img src="http://192.168.56.1/image/' + image.imagePath + '" alt="" onclick="showGallery(this.src, this.data-title, this.data-date)" class="crop-img" data-date="' + image.dateCreated + '" data-title="' + image.title + '"><div class="item-overlay"><p>' + image.title + '</p></div></div>');
            count++;
        } else {
            i++;
            row = 'row' + i;
            $('.content-wrapper').append('<div class="row wrapper" id="' + row + '"></div>');
            randomNum = Math.floor(Math.random() * (maxImgPerRow - minImgPerRow + 1)) + minImgPerRow;
            count = 0;
        }
    });
};

function notify(message) {
    $('#notification-text').text(message);
    $('.notification').css('bottom', '20px');
    window.setTimeout(function () {
        $('.notification').css('bottom', '-200%');
    }, 2500);
};

function showGallery(path, title, date) {
    $("#gallery").css("visibility", "visible");
    $("#galleryImg").attr('src', path);
    $("#image-title").text(title);
    $("#image-date").text(date);
};