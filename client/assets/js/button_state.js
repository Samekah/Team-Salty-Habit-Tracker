function buttonState(){
    $("input").each(function(){
        $('#registerb').attr('disabled', 'disabled');
        if($(this).val() == "" ) return false;
        $('#registerb').attr('disabled', '');
    })
}

$(function(){
    $('#registerb').attr('disabled', 'disabled');
    $('input').change(buttonState);
})