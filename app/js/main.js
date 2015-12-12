var myModule = (function(){

    var init = function(){
        _setupListeners();
    };

    function _setupListeners(){
        $('#addProject').on('click', _showModal);
    }

    var _showModal = function(e){
        e.preventDefault();
        $('#modalBackdrop').popup();
        $('#modal').popup();
    };

    return {
        init: init
    };

})();

myModule.init();
