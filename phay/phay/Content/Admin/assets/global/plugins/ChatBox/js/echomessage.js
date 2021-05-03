/*
 * echotest.js
 *
 * Derived from Echo Test of WebSocket.org (http://www.websocket.org/echo.html).
 *
 * Copyright (c) 2012 Kaazing Corporation.
 */

//var url = "ws://socketserver.longan.edu.vn:19019/RoomService";
var url = "ws://gateway.lttc.edu.vn:1789/RoomService";
//var url = "ws://localhost:1789/RoomService";
var output;

function init () {
    //output = document.getElementById("box-content-message-1");
    
    doWebSocket ();
}

function doWebSocket () {
  websocket = new WebSocket (url);

  websocket.onopen = function (e) {
    onOpen (e);
  };

  websocket.onmessage = function (e) {
    onMessage (e);
  };

  websocket.onerror = function (e) {
    onError (e);
  };

  websocket.onclose = function (e) {
    onClose (e);
  };
}

function onOpen (event) {
  //writeToScreen ("CONNECTED");
    send("OpenSocket@@@" + guidmes);
}

function onMessage (event) {
  //writeToScreen ('<span style="color: blue;">RESPONSE: ' + event.data + '</span>');
  //websocket.close ();

    ReceiveToScreen(event.data);
}

function onError (event) {
    //writeToScreen('<span style="color: red;">ERROR: ' + event.data + '</span>');

}

function onClose (event) {
  //writeToScreen ("DISCONNECTED");
}

function send (message) {
    //SendToScreen(message);
    websocket.send(message);
}

function writeToScreen (message) {
  var pre = document.createElement ("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  output.context.appendChild (pre);
}

function SendToScreen(message) {   
    output = document.getElementById("box-content-message-chat");
    
    var htmlMessage = document.createElement("div");
    htmlMessage.innerHTML = message;
    output.appendChild(htmlMessage);
}

function ReceiveToScreen(message) {
    if (message.split('@@@')[0] == 'Online') {
        $('.contacts-list-item').find('.online').remove();
        $('.contacts-list-item').find('.chat-online-right').remove();
        var online = message.replace('Online@@@', '');
        if (online != undefined && online != "") {
            online = online.split(',');
            $.each(online, function (index, value) {
                var targetOnline = $(".contacts-list-item[data-guid='" + value + "']").find('.user');
                targetOnline.append('<div class="status-icon online"></div>');

                $('.contacts-list-item[data-guid=' + value + ']').append('<div class="chat-online-right"></div>')
            });
        }
        
    } else {
        try {
            $('.icon-chatbox-footer span').remove();
        } catch (ex) {
        }
        try {
            $('.icon-chatbox-footer').append('<span class="bellchatfooter"></span>');
        } catch (ex) { }

        var checkGuid = document.getElementById("box-content-message-chat").getAttribute('data-guidto');
        if (checkGuid == message.split('@@@')[0]) {
            output = document.getElementById("box-content-message-chat");
            var htmlMessage = document.createElement("div");
            htmlMessage.innerHTML = message.replace(checkGuid + '@@@', '');
            output.appendChild(htmlMessage);
        } else {
            
            var targetcount = $('.contacts-list-item[data-guid=' + message.split('@@@')[0] + ']').find('.user');
            var htmlcount = "<div class=\"unread-count ng-star-inserted\"></div>";
            targetcount.append(htmlcount);

            var targeth3 = $('.contacts-list-item[data-guid=' + message.split('@@@')[0] + '] h3');
            var htmlh3 = " <span class=\"bellchat\"></span>";
            targeth3.append(htmlh3);
        }
        
    }
}

window.addEventListener("load", init, false);


