(function () {
    var testTool = window.testTool;
    var tmpArgs = testTool.parseQuery();
    var meetingConfig = {
        apiKey: tmpArgs.apiKey,
        meetingNumber: parseInt(tmpArgs.mn),
        userName: (function () {
            if (tmpArgs.name) {
                try {
                    return testTool.b64DecodeUnicode(tmpArgs.name);
                } catch (e) {
                    return tmpArgs.name;
                }
            }
            return (
                "#" +
                tmpArgs.version +
                "#" +
                testTool.detectOS() +
                "#" +
                testTool.getBrowserInfo()
            );
        })(),
        passWord: testTool.b64DecodeUnicode(tmpArgs.pwd),
        leaveUrl: tmpArgs.leavingurl,
        role: parseInt(tmpArgs.role, 10),
        userEmail: (function () {
            try {
                return testTool.b64DecodeUnicode(tmpArgs.email);
            } catch (e) {
                return tmpArgs.email;
            }
        })(),
        lang: tmpArgs.lang,
        signature: tmpArgs.signature || "",
        china: tmpArgs.china === "1",
    };
    // A tool use debug mobile device
    if (testTool.isMobileDevice()) {
        vConsole = new VConsole();
    }
    //console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    function beginJoin(signature) {
        //console.log('MEETING CONFIG: ', JSON.stringify(meetingConfig));
        ZoomMtg.init({
            leaveUrl: meetingConfig.leaveUrl,
            webEndpoint: meetingConfig.webEndpoint,
            disableInvite: true,
            success: function () {
                ZoomMtg.i18n.load('/Scripts/zoom_sdk/lang/vi-VN.json', "customized_vi_VN_lang");
                ZoomMtg.i18n.reload("customized_vi_VN_lang");
                ZoomMtg.join({
                    meetingNumber: meetingConfig.meetingNumber,
                    userName: meetingConfig.userName,
                    signature: signature,
                    apiKey: meetingConfig.apiKey,
                    userEmail: meetingConfig.userEmail,
                    passWord: meetingConfig.passWord,
                    success: function (res) {
                        ZoomMtg.getAttendeeslist({});
                        ZoomMtg.getCurrentUser({
                            success: function (res) {
                                //console.log("success getCurrentUser", res.result.currentUser);
                            },
                        });
                    },
                    error: function (res) {
                        console.log(res);
                    },
                });
            },
            error: function (res) {
                console.log(res);
            },
        });
        ZoomMtg.inMeetingServiceListener('onUserJoin', function (data) {
            // console.log('inMeetingServiceListener onUserJoin', data);
        });
        ZoomMtg.inMeetingServiceListener('onUserLeave', function (data) {
            // console.log('inMeetingServiceListener onUserLeave', data);
        });
        ZoomMtg.inMeetingServiceListener('onUserIsInWaitingRoom', function (data) {
            // console.log('inMeetingServiceListener onUserIsInWaitingRoom', data);
        });
        ZoomMtg.inMeetingServiceListener('onMeetingStatus', function (data) {
            // console.log('inMeetingServiceListener onMeetingStatus', data);
        });
    }
    beginJoin(meetingConfig.signature);
})();
