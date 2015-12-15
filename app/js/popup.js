;(function( $ ) {
    var defaults = {
        closeSelector: '#closeModal'
    };
    var opt;

    $.fn.popup = function( options ) {
        opt = $.extend({}, defaults, options);
        var $popup = this;

        return $popup.each(function() {
           init();
        });


        function init(){
            if(opt.onOpen) {
                opt.onOpen();
            }
            $('body').addClass('modal-open');
            $popup.show();
            $popup.fadeIn(500);
            _setupListeners();
        }

        function _setupListeners(){
            _hideByClick();
            _hideByKey();
            _hideOnBackdrop();
        }

        function _hideByClick(){
            $(opt.closeSelector).one('click.closebybtn', function(e){
                e.preventDefault();
                _hideModal();
            });
        }

        function _hideByKey() {
            $(document).keydown(function(e) {
                if (e.keyCode == 27) {
                    _hideModal();
                }
            });
        }

        function _hideOnBackdrop() {
            $popup.on('click.backdrop', function(e) {
                if (e.target === e.currentTarget) {
                    _hideModal();
                }
            });
        }

        function _hideModal() {
            $popup.hide();
            $popup.fadeOut(500);
            if(opt.onClose) {
                opt.onClose();
            }
            $('body').removeClass('modal-open');
            _removeListeners();
        }

        function _removeListeners() {
            $(opt.closeSelector).off('click.closebybtn');
            $(document).off('keydown');
            $popup.off('click.backdrop');
        }
    };
})(jQuery);
