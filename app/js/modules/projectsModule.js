var projectsModule = (function(){

    /*** Private variables***/
    // Settings for jquery validate plugin
    var validateOptions = {
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
        $('#fileupload').on('change', _setFileName);
        $('#addedProjectForm').on('submit', _submitForm);
    }

    function _showModal(e){
        e.preventDefault();
        $('#modalBackdrop, #modal').popup(popupOptions);
    };

    //Callback, will be called when popup is opened,
    //Need for IE8
    function _setPlaceholders(){
        if (document.createElement("input").placeholder == undefined) {
            $('input, textarea').placeholder();
        }
    }

    //Callback, will be called when popup is closed
    function _onModalClose(){
        $('form').find('[name]').each(function(index, element){
            $(element).val('');
        });
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