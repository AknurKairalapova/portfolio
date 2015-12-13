var projectsModule = (function(){

    var init = function(){
        _setupListeners();

    };

    function _setupListeners(){
        $('#addProject').on('click', _showModal);
        _setFileName();
        $('#submitProject').on('click', _validate);
    }

    var _showModal = function(e){
        e.preventDefault();
        $('#modalBackdrop, #modal').popup({
            onOpen: _setPlaceholders,
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

    function _validate(e){
        e.preventDefault();
        var data = {
            Name: $('#projectName').val(),
            FileName: $('#projectFileName').val(),
            Url: $('#projectUrl').val(),
            Message: $('#projectMessage').val()
        }
        for(var prop in data){
            if(data.hasOwnProperty(prop)) {
                if(!data[prop]) {
                    console.log('Введите данные');
                }
            }
        }
    }

    function _setPlaceholders(){
        $('input, textarea').placeholder();
    }

    return {
        init: init
    };

})();

projectsModule.init();
