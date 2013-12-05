#jquery.modal.js

## Usage:

```html
<script src="js/jquery.js"></script>
```

Define script:

```javascript
$(document).ready(function(){
  $('.popup-link-js').modal(); //Запуск срипта на кнопку class="popup-link-js"
});
```
По умолчанию попап выводится центрированым.

Define script with options:

```javascript
$(document).ready(function(){
  $('.popup-link-js').modal({
    modalPositionCenter: false
  });
});
```
Если в настройках стоит modalPositionCenter: false, то попап не будет центрироваться по середине экрана, а будет выводится в произвольном месте. Произвольное позиционирование задается с помощью класса popupper-pos

Define default html link

```html
<span class="popup-link popup-link-js" data-popup="value">popup-link</span>
```

Define default html popup

```html
<!-- Popupper-value --> 
<div class="popupper_value popupper popupper-js">
  <div class="popupper_block">
    <div class="popupper-close popupper-close-js">Close</div> // закрыть попап
    modal window
  </div>
</div>
<!-- /Popupper-value -->
```

Define default html popup shadow

```html
<div class="popup-shadow popup-shadow-js"></div> 
```

Function selectjs

```javascript
// modal.js
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
            popupShadowBlock: $('.popup-shadow-js'),
            popupPosNumber: 50    
        },  
        settings = $.extend(defaults, options); 
 
        settings.modalLink.click(function(){
            var popupScroll = $(window).scrollTop(),
                popupPos = popupScroll + settings.popupPosNumber,
                modalLinkID = $(this).data("popup"),
                modalPopap = $('.popupper_'+modalLinkID);

            settings.popup.hide();
            settings.popupShadowBlock.show();
            modalPopap.show();
            if (settings.modalPositionCenter == true) {
                modalPopap.css({top:($(window).height()/2-modalPopap.height()/2), left:($(window).width()/2-modalPopap.width()/2)});
            }
            else{
                modalPopap.addClass('popupper-pos').css('top', popupPos);
            };           

        });
        settings.popup.on('click','.popupper-close-js', function(){
            block(settings);
            return;
        });
        $(window).keydown(function(eventObject){
            if (eventObject.which == 27){
                block(settings);
            }
        });      
        $(document).click(function(event) {
            console.log(settings.key);
            var state = $('.popup-shadow-js').css("display") == 'none';
            if(settings.key && !$(event.target).closest(settings.popup).length){
                block(settings);
                return;
            }
            
            if(!$(event.target).hasClass("popupper-close-js"))
            {
               settings.key = true;
            }
            if(state) settings.key = false;
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
// end modal.js
```

Default css
```css
.popup-link{
  cursor: pointer;
}
.popup-shadow{
  display: none;
  background: rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%
}
.popupper{
  display: none;
  position: absolute;
}
.popupper-close{
  cursor: pointer;
}
.popupper-close:hover{}
.popupper-b{}
.popupper-pos{}
```

