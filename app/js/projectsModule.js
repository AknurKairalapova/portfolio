var projectsModule = (function(){

    var validator = $('#addedProjectForm').validate({
        rules: {
            name: "required",
            "files[]": "required",
            url: "required",
            message: "required"
        },
        messages: {
            name: "введите название",
            "files[]": "изображение",
            url: "ссылка на проект",
            message: "описание проекта"
        }
    });

    var init = function(){
        _setupListeners();
    };

    function _setupListeners(){
        $('#addProject').on('click', _showModal);
        _setFileName();
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
        $('#fileupload').val('');
        $('#projectUrl').val('');
        $('#projectMessage').val('');
        validator.resetForm();
        $("input, textarea").removeClass("error");
    }

    function _setPlaceholders(){
        if (document.createElement("input").placeholder == undefined) {
            $('input, textarea').placeholder();
        }
    }


    function _setFileName() {
        var $file = $('#fileupload');
        $file.on('change', function(e){
            var filePath = e.target.value.split('\\'),
                fileName = filePath[filePath.length-1];
            $('#projectFileName').val(fileName);
        });
    }


    function _submitForm(e){
        e.preventDefault();
        validator.form();

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
