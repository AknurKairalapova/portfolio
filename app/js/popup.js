;(function( $ ) {
    var defaults = {  };
    var opt;

    $.fn.popup = function( options ) {
        opt = $.extend({}, defaults, options);
        var $popup = this;

        $popup.hide = function() {
            _hideModal();
        };

        return $popup.each(function() {
            init();
        });

        function _hideModal() {
            $popup.hide();
            $popup.fadeOut(500);
        }

        function init(){
            $popup.show();
            $popup.fadeIn(500);
            //_setupListeners();
        }

        function _setupListeners(){
            $('#closeModal').on('click', _hideModal);
        }

    };

    

})(jQuery);


// init : function( params ) { 
//   options = $.extend({}, defaults, options, params);
//   debugger;
//   this.show();
//   this.fadeIn(500);
// },
// hide : function( ) {
//   this.hide();
//   this.fadeOut(500);
//   this.removeAttr('style');
// }