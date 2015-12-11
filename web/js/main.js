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
        $('.content-wrapper').append('<div class="row wrapper" id="row0"></div>');
        generateLayout(jsonFile);
    });

    //READER IMAGE META DATA
    $("#file").change(function (e) {
        if (this.disabled) return alert('File upload not supported!');
        var F = this.files;
        if (F && F[0])
            for (var i = 0; i < F.length; i++) readImage(F[i]);
    });
});

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
        minImgPerRow = 3;
        maxImgPerRow = 3;
    } else if (clientWidth >= 1301 && clientWidth <= 1600) {
        minImgPerRow = 4;
        maxImgPerRow = 5;
    } else if (clientWidth >= 1601) {
        minImgPerRow = 4;
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
            $('#' + row).append('<div class="item"><img src="http://127.0.0.1:8888/img/' + image.imagePath + '" alt="" onclick="showGallery(this)" class="crop-img" data-date="' + image.dateCreated + '" data-title="' + image.title + '"><div class="item-overlay"><p>' + image.title + '</p></div></div>');
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

function showGallery(obj) {
    $("#gallery").css("visibility", "visible");
    $("#galleryImg").attr('src', $(obj).attr('src'));
    $("#title").text($(obj).attr('data-title'));
    $("#image-date").text($(obj).attr('data-date'));
};

function readImage(file) {
    var reader = new FileReader();
    var image = new Image();

    reader.readAsDataURL(file);
    reader.onload = function (_file) {
        image.src = _file.target.result;
        image.onload = function () {
            $('uploadForm').append('<p>' + this.width + '</p>')
        };
        image.onerror = function () {
            alert('Invalid file type: ' + file.type);
        };
    };
};