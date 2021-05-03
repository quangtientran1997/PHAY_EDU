$(document).ready(function(){
    var outerContent = $('.cal-data-content');
    var innerContent = $('.cal-data-content');

    outerContent.scrollLeft( (innerContent.width() - outerContent.width()) / 2);

});
