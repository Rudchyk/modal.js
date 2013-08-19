/*
 * @see https://github.com/Rudchyk/modal.js
 * Author: Rudchyk.Sergii
 */

(function($){
 
function block(settings){
    settings.popup.hide();
    settings.popupShadowBlock.hide();
    settings.key = false;   
}
 
 
modal = function() {
 
    this._init = function(element, options) {
 
        var defaults = {
            key: false,
            modalPositionCenter: true,
            modalLink: $(element),
            popup: $('.popupper-js'),
            popupShadowBlock: $('.popup-shadow-js')     
        },  
        settings = $.extend(defaults, options); 
 
        settings.modalLink.click(function(){
            var modalLinkID = $(this).attr("data-popup"),
                modalPopap = $('.popupper_'+modalLinkID);

            alert(modalLinkID);
            settings.popup.hide();
            settings.popupShadowBlock.show();
            modalPopap.show();
            if (settings.modalPositionCenter == true) {
                modalPopap.css({top:($(window).height()/2-modalPopap.height()/2), left:($(window).width()/2-modalPopap.width()/2)});
            }
            else{
                modalPopap.addClass('popupper-pos');
            }; 
              
        });
        settings.popup.find('.popupper-close-js').click(function(){
            block(settings);
            return;
        });
        $(window).keydown(function(eventObject){
            if (eventObject.which == 27){
                block(settings);
            }
        });      
        $(document).click(function(event) {
            if(settings.key && !$(event.target).closest(settings.popup).length){
                block(settings); 
                return;
            }
            if(!$(event.target).hasClass("popupper-close-js"))
            {
               settings.key = true;
            }
        });         
    };
};
    // Launch plugin
    $.fn.modal = function( options ){
 
        return this.each(function(){
             
             $( this ).data( "modal", new modal()._init( this, options ) );
 
         });
    };
})(jQuery);