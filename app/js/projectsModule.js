var projectsModule = (function(){

    var init = function(){
        _setupListeners();

    };

    function _setupListeners(){
        $('#addProject').on('click', _showModal);
        _setFileName();
        $('#addedProjectForm').validate({
            rules: {
                name: "required",
                fileName: "required",
                url: "required",
                message: "required"
            },
            messages: {
                name: "введите название",
                fileName: "изображение",
                url: "ссылка на проект",
                message: "описание проекта"
            }
        });
       $('#addedProjectForm').on('submit', _submitForm);
    }


    /**** Modal ****/
    var _showModal = function(e){
        e.preventDefault();
        $('#modalBackdrop, #modal').popup({
            onOpen: _setPlaceholders,
            onClose: _onModalClose
        });
       
    };

    function _onModalClose(){
        $('#projectName').val('');
        $('#projectFileName').val('');
        $('#projectUrl').val('');
        $('#projectMessage').val('');
    }
    
    function _setPlaceholders(){
        $('input, textarea').placeholder();
    }


    function _setFileName() {
        var $file = $('#fileinput');
        $file.on('change', function(e){
            var filePath = e.target.value.split('\\'),
                fileName = filePath[filePath.length-1];
            $('#projectFileName').val(fileName);
        });
    }


    function _submitForm(e){
        e.preventDefault();
        if($(this).valid() === true){
            console.log('Valid');
            //TODO ajax
        }else{
            console.log('Not valid');
        }
    }

    return {
        init: init
    };

})();

projectsModule.init();
