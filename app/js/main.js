var mainModule = (function(){

    var init = function(){
        _setupListeners();

    };

    function _setupListeners(){
        $('input, textarea').placeholder();
    }

    return {
        init: init
    };

})();

mainModule.init();
