jQuery(document).ready(function($) {
    $(".toggle-sidebar-folded").click(function(){
        $(".chat-panel").removeClass("unfolded");
        $(".chat-panel .material-icons").css({'display':'block'});
        $(".chat-panel .header .alphabet-avatar").css({ 'display': 'none' });
        $(".icon-chatbox").css({ 'display': 'inherit' });
        $(".box-chat-panel").css({ 'display': 'none' });
        $('.chat-panel').removeClass('chat-full-screen');
    });

    $(".material-icons").click(function(){
        $(".chat-panel").addClass("unfolded");
        $(".chat-panel.unfolded").css({'width':'', 'min-width':'', 'max-width':''});
    });

    $(".icon-chatbox").click(function () {
        $(".icon-chatbox").css({ 'display': 'none' });
        $(".box-chat-panel").css({ 'display': 'flex' });
    });


    $('.toggle-full').click(function() {
        $('.chat-panel').toggleClass('chat-full-screen');
        $(this).toggleClass('Open');
    });
});


jQuery(document).ready(function($) {
    if($('.nicescroll-cl').length>0){
        $('.nicescroll-cl').niceScroll({
            cursorborder: 'none',
            cursorcolor: '#eaeaea',
            usetransition: true,
            autohidemode: "scroll",
        });
    }
});

$('#gallery-chat .message-photo').lightGallery();




(function () {
    var chat = {
        messageToSend: '',
        init: function () {
            this.cacheDOM();
            this.bindEvents();
            this.render();
        },
        cacheDOM: function () {
            this.$chatHistory = $('.chat-history');
            this.$button = $('.send-message-button');
            this.$textarea = $('#message-to-send');
            this.$chatHistoryList = this.$chatHistory.find('.box-content-message');
        },
        bindEvents: function () {
            this.$button.on('click', this.addMessage.bind(this));
            this.$textarea.on('keyup', this.addMessageEnter.bind(this));
        },
        render: function () {
            this.scrollToBottom();
            if (this.messageToSend.trim() !== '') {
                var template = Handlebars.compile($("#message-template").html());
                var context = {
                    messageOutput: this.messageToSend,
                    time: this.getCurrentTime()
                };

                this.$chatHistoryList.append(template(context));
                this.scrollToBottom();
                this.$textarea.val('');

            }

        },

        addMessage: function () {
            this.messageToSend = this.$textarea.val()
            this.render();
        },
        addMessageEnter: function (event) {
            if (event.keyCode === 13) {
                this.addMessage();
            }
        },
        scrollToBottom: function () {
            this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
        },
        getCurrentTime: function () {
            return new Date().toLocaleTimeString().
                replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
        },
    };

    chat.init();
})();