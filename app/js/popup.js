;(function( $ ) {
    var defaults = { 
        closeSelector: '#closeModal',
        popupClass: 'modal'
    };
    var opt;

    $.fn.popup = function( options ) {
        opt = $.extend({}, defaults, options);
        var $popup = this;

        return $popup.each(function() {
           init();
        });
        

        function init(){
            $popup.show();
            $popup.fadeIn(500);
            _setupListeners();
        }

        function _setupListeners(){
            $(opt.closeSelector).one('click', _hideModal);
            _hideByKey();
            _hideOnBackdrop();
        }

        function _hideByKey() {
            $(document).keydown(function(e) {
                if (e.keyCode == 27) { 
                    _hideModal();
                }
            });
        }

        function _hideOnBackdrop() {
            $(document).mousedown(function(e) {
                if (e.target && $(e.target).eq(0).hasClass(opt.popupClass)) { 
                    _hideModal();
                }
            });
        }

        function _hideModal(e) {
            if(e){
                e.preventDefault();
            }            
            $popup.hide();
            $popup.fadeOut(500);
            opt.onClose();
        }
    };
})(jQuery);
