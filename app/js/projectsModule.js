var projectsModule = (function(){

    var validator = $('#addedProjectForm').validate({
        rules: {
            name: "required",
            fileName: "required",
            "files[]": "required",
            url: "required",
            message: "required"
        },
        messages: {
            name: "введите название",
            "files[]": "изображение",
            url: "ссылка на проект",
            message: "описание проекта"
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass(errorClass).removeClass(validClass);
            if($(element).attr('data-relative')) {
               $($(element).attr('data-relative')).addClass(errorClass).removeClass(validClass);
            }
            var tooltip = new Tooltip(element);
            tooltip.init();
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass(errorClass).addClass(validClass);
            if($(element).attr('data-relative')) {
               $($(element).attr('data-relative')).removeClass(errorClass).addClass(validClass);
            }
            var tooltip = new Tooltip(element);
            tooltip.destroy();
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
    /**** End of Modal ****/

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