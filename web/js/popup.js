
$(document).ready(function() {
	
	  
   $("#comment-post-btn").click(function() {
       //text within textarea
       var text = $("#comment-post-text").val();
       var userId = $("#userId").val();
       var userName = $("#userName").val();
       
       if(text.length>0){
           $(".comment-insert-container").css("border", "1px solid #e1e1e1");
           //$.post("/ajax/")
           console.log(text + " Username: " +userName +" User id:" +userId);
              var t ="";
                            t += '<li class="comment-holder" id="_1">';    
                            t += '<div class="comment-body">';  
                            t += '<h3 class="username-field">Insert user</h3>';
                            t += '<div class="comment-text"> ' +text  +' </div>';
                            t += '</div>'; 
                            t += '</li>';
    
    
    $(".comment-holder-ul").prepend(t);
       }
       else {
           $(".comment-insert-container").css("border", "1px solid #ff0000");
           console.log("The text area is empty");
       }
       
       //remove the text from textarea
       $("#comment-post-text").val("");
   });   
    
    console.log("ready");
    $("#clickMe").click(function(e) {
        console.log('$("#clickMe").click');
        openPopup();
        updatePopup();
    });
    $("#modal-close-button").click(function(e){
        console.log('$("#modal-close-button").click');
        closePopup();
    });
    
    $(window).resize(function() {
       updatePopup(); 
    });
    
});

function openPopup() {
    $("#clickMe").prop("disabled", true);
    $("#popup-content").fadeIn();
}

function closePopup() {
    $("#clickMe").prop("disabled", false);
    $("#popup-content").fadeOut();
}

function updatePopup() {
    var $popupContent= $("#popup-content");
    //var top = ($(window).height()- $popupContent.outerHeight()) /2; // Center vertical
    var top ="50px";
    var left = ($(window).width()- $popupContent.outerWidth()) /2; // center horizontal
    $popupContent.css ({
        "top" : top,
        "left" : left
    });
}

function comment_insert(){
    
                            var t ="";
                            t += '<li class="comment-holder" id="_1">';    
                            t += '<div class="comment-body">';  
                            t += '<h3 class="username-field">Insert user</h3>';
                            t += '<div class="comment-text">new comment text</div>';
                            t += '</div>'; 
                            t += '</li>';
    
    
    $(".comment-holder-ul").prepend(t);
}   