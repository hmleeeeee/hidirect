$(function(){
    
    var select = $("select.select_box");
    
    select.change(function(){
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("label").text(select_name);
    });
    
});
