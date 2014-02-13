/*
 * @see https://github.com/Rudchyk/modal.js
 * Author: Rudchyk.Sergii
 */

(function($){
 
function block(settings, modal){
    $(modal.modalWindow)
                        .hide()
                        .removeClass(modal.posClass)
                        .css({top: '', left: ''});
    settings.shadowBlock.hide();
    settings.key = false;
}
 
 
modal = function() {
 
    this._init = function(element, options) {
 
        var defaults = {
            key: false,
            center: true,
            modalLink: $(element),
            modalWindowClass: 'popupper',
            shadowBlock: $('.popup-shadow-js'),
            pos: 50,
            modalData : 'popup',
            posClass : '-pos',
            closeClass : '-close-js'
        },  
        settings = $.extend(defaults, options);

        var modal ={
            modalWindow : '.'+settings.modalWindowClass+'-js',
            close : '.'+settings.modalWindowClass+settings.closeClass,
            posClass : settings.modalWindowClass+settings.posClass
        }
 
        settings.modalLink.click(function(){
            var $thisEl = $(this),
                $modalScroll = $(window).scrollTop(),
                $modalPos = $modalScroll + settings.pos,
                $modalId = $thisEl.data(settings.modalData),
                $modalPopap = $('.'+settings.modalWindowClass+'-'+$modalId);

            $(modal.modalWindow)
                                .hide()
                                .removeClass(modal.posClass)
                                .css({top: '', left: ''});
            settings.shadowBlock.show();
            $modalPopap.show();
            if (settings.center == true) {
                $modalPopap.css({top:($(window).height()/2-$modalPopap.height()/2), left:($(window).width()/2-$modalPopap.width()/2)});
            }
            else{
                $modalPopap.addClass(modal.posClass).css({top: $modalPos, left: ''});
            };
        });
        $(modal.modalWindow).on('click', modal.close, function(){
            block(settings, modal);
            return;
        });
        $(window).keydown(function(eventObject){
            if (eventObject.which == 27){
                block(settings, modal);
            }
        });
        $(document).click(function(event) {
            var state = settings.shadowBlock.css("display") == 'none';
            if(settings.key && !$(event.target).closest(modal.modalWindow).length){
                block(settings, modal);
                return;
            }
            
            if(!$(event.target).hasClass(settings.modalWindowClass+settings.closeClass))
            {
               settings.key = true;
            }
            if(state) settings.key = false;
        });
        $(window).bind("resize", function(){
            var $el = $(modal.modalWindow+':visible');
            if (!$el.hasClass(modal.posClass)) {
                $el.css({top:($(window).height()/2-$el.height()/2), left:($(window).width()/2-$el.width()/2)});
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