$(".toggle-sidebar-folded").click(function(){
    $(".chat-panel").removeClass("unfolded");
    $(".avatar.mx-16").css({'display':'none'});
    $(".ng-star-inserted .material-icons").css({'display':'block'});
    $(".chat-panel").css({ 'width': '70px', 'min-width': '70px', 'max-width': '70px' });
    $('.chat-panel').removeClass('chat-full-screen');
    $(".icon-chatbox").css({ 'display': 'inherit' });
    $(".box-chat-panel").css({ 'display': 'none' });

    try {
        $('.icon-chatbox-footer span').remove();
    } catch (ex) { }   
});

$(".material-icons").click(function(){
    $(".chat-panel").addClass("unfolded");
    $(".chat-panel.unfolded").css({'width':'', 'min-width':'', 'max-width':''});
});

$(".contacts-list-item").click(function () {
    $(".box_room_mes").html("");
    $(".chat-panel.unfolded .ng-star-inserted .material-icons").css({'display':'none'});
    $(".chat-panel.unfolded .avatar.mx-16").css({ 'display': 'block' });
    $(".chat-panel").addClass("unfolded");
    $('.contacts-list-item').removeClass("contacts-active");
    $(this).addClass("contacts-active");
    $(this).find('.bellchat').remove();
    $(this).find('.unread-count').remove();
    
    $(".chat-panel.unfolded").css({ 'width': '', 'min-width': '', 'max-width': '' });

    $.ajax({
        url: '/ClientChat/RoomChat',
        type: 'POST',
        data: { guid : $(this).data('guid') },
        success: function (data) {
            $(".box_room_mes").html(data);
        }
    });

    try {
        $('.icon-chatbox-footer span').remove();
    } catch (ex) { }   
});
$(".icon-chatbox").click(function () {
   
    $(".icon-chatbox").css({ 'display': 'none' });
    $(".box-chat-panel").css({ 'display': 'flex' });
    try {
        $('.icon-chatbox-footer span').remove();
    } catch (ex) { }   

    $('.chat-panel').addClass('chat-full-screen');
});

$('.toggle-full').click(function () {
    $('.chat-panel').toggleClass('chat-full-screen');
});

jQuery(document).ready(function($) {
            if($('#contacts-list').length>0){
                    $('#contacts-list').niceScroll({
                        cursorborder: 'none',
                        cursorcolor: '#fff'
                    });
    }
    
});

function SendMessageChat(e) {

    if (e.keyCode == 13) {        
        var message = e.currentTarget.value;
        if (message != undefined && message != '') {
            var mes_send = e.currentTarget.getAttribute('data-guid') + '@@@' + message.trim();
            send(mes_send);
            $('.message-chat').val('');
        }
    }
}
