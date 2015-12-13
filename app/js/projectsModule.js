var projectsModule = (function(){

    var init = function(){
        _setupListeners();

    };

    function _setupListeners(){
        $('#addProject').on('click', _showModal);
        _setFileName();
    }

    var _showModal = function(e){
        e.preventDefault();
        $('#modalBackdrop, #modal').popup({
            onClose: _onModalClose
        });
       
    };

    function _setFileName() {
        var $file = $('#fileinput');
        $file.on('change', function(e){
            var filePath = e.target.value.split('\\'),
                fileName = filePath[filePath.length-1];
            $('#projectFileName').val(fileName);
        });
    }

    function _onModalClose(){
        $('#projectName').val('');
        $('#projectFileName').val('');
        $('#projectUrl').val('');
        $('#projectMessage').val('');
    }

    return {
        init: init
    };

})();

projectsModule.init();
