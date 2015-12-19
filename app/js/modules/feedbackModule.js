var feedbackModule = (function(){

    /*** Private variables***/
    // Settings for jquery validate plugin
    var validateOptions = {
        rules: {
            name: "required",
            email: {
                required: true,
                email : true
            },
            messagetext: "required",
            code: "required"
        },
        messages: {
            name: "введите имя",
            email: {
                required: "введите email",
                email : "введите корректный email"
            },
            messagetext: "ваш вопрос",
            code: "код капчи"
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass(errorClass).removeClass(validClass);
            var tooltip = new Tooltip(element);
            tooltip.init();
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass(errorClass).addClass(validClass);
            var tooltip = new Tooltip(element);
            tooltip.destroy();
        }
    };

    var validator = $('#feedbackForm').validate(validateOptions);


    /*** Initialization of the module ***/
    function init(){
        _setupListeners();
        _setPlaceholders();
    };

    return {
        init: init
    };


    /*** Private functions ***/

    // Add listeners on module initialization
    function _setupListeners(){
       $('#feedbackForm').on('submit', _submitForm);
       $('#reset').on('click', _resetData);
    }
    
    //Need for IE8
    function _setPlaceholders(){
        if (document.createElement("input").placeholder == undefined) {
            $('input, textarea').placeholder();
        }
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

    // Reset form data and validation
    function _resetData(e) {
        e.preventDefault();
        $('form').find('[name]').each(function(index, element){
            $(element).val('');
        });
        validator.resetForm();
    }
})();