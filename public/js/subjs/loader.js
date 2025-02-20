/*------------------------------------------
--------------------------------------------
Add Loading When fire Ajax Request
--------------------------------------------
--------------------------------------------*/
$(document).ajaxStart(function() {
    $('#loading').addClass('loading');
    $('#loading-content').addClass('loading-content');
});

/*------------------------------------------
--------------------------------------------
Remove Loading When fire Ajax Request
--------------------------------------------
--------------------------------------------*/
$(document).ajaxStop(function() {
    $('#loading').removeClass('loading');
    $('#loading-content').removeClass('loading-content');
});