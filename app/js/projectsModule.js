var projectsModule = (function(){

    var init = function(){
        _setupListeners();
    };

    function _setupListeners(){
        $('#addProject').on('click', _showModal);
    }

    var _showModal = function(e){
        e.preventDefault();
        $('#modalBackdrop, #modal').popup({
            onClose: _onModalClose
        });
       
    };

    function _onModalClose(){
        $('#projectName').val('');
        $('#projectImg').val('');
        $('#projectUrl').val('');
        $('#projectMessage').val('');
    }

    return {
        init: init
    };

})();

projectsModule.init();
