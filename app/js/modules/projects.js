var projects = (function(){

    /*** Private variables***/
    // Settings for jquery validate plugin
    var validateOptions = {
        rules: {
            name: "required",
            "files[]": "required",
            url: {
                required: true,
                url : true
            },
            message: "required"
        },
        messages: {
            name: "введите название",
            "files[]": "загрузите изображение",
            url: {
                required: "введите ссылку на проект",
                url : "введите корректную ссылку"
            },
            message: "введите описание проекта"
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass(errorClass).removeClass(validClass);
            if($(element).attr('data-relative')) {
               $($(element).attr('data-relative')).addClass(errorClass).removeClass(validClass);
            }
            tooltip.init(element);
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass(errorClass).addClass(validClass);
            if($(element).attr('data-relative')) {
               $($(element).attr('data-relative')).removeClass(errorClass).addClass(validClass);
            }
            tooltip.destroy(element);
        }
    };

    var validator = $('#addedProjectForm').validate(validateOptions);

    // Settings for own popup plugin
    var popupOptions = {
        onOpen: _setPlaceholders,
        onClose: _onModalClose
    };


    /*** Initialization of the module ***/
    function init(){
        _setupListeners();
    };

    return {
        init: init
    };


    /*** Private functions ***/

    // Add listeners on module initialization
    function _setupListeners(){
        $('#addProject').on('click', _showModal);
        $('#projectFileName').on('click', function(e){
            $('#fileupload').trigger('click');
        });
        $('#fileupload').on('change', function(e){
            _setFileName(e);
            validator.element( "#fileupload" );
            if($(this).valid()){
                $('#projectFileName').focus();
            }
        });
        $('#addedProjectForm').on('submit', _submitForm);
    }

    function _showModal(e){
        e.preventDefault();
        $('#modalBackdrop, #modal').popup(popupOptions);
    };

    //Callback, will be called when popup is opened,
    //Need for IE8
    function _setPlaceholders(){
        if (document.createElement("input").placeholder === undefined) {
            $('input, textarea').placeholder();
        }
    }

    //Callback, will be called when popup is closed
    function _onModalClose(){
        $('form').find('[name]').each(function(index, element){
            $(element).val('');
        });
        if(document.createElement("input").placeholder === undefined){
            $("#fileupload").replaceWith($("input[type='file']").clone(true));
        }
        validator.resetForm();
        $("input, textarea").removeClass("error");
    }

    function _setFileName(e) {
        var filePath = e.target.value.split('\\'),
            fileName = filePath[filePath.length-1];
        $('#projectFileName').val(fileName);
    }

    function _submitForm(e){
        e.preventDefault();
        validator.form();

        if($(this).valid()){
            console.log('Valid');
            //TODO ajax
        } else{
            console.log('Not valid');
        }
    }
})();
