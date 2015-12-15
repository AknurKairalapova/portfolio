var feedbackModule = (function(){

    var init = function(){
        _setupListeners();
    };

    var validator = $('#feedbackForm').validate({
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
            $(element).next().addClass('tooltip');
        }
    });

    function _setupListeners(){
       $('#feedbackForm').on('submit', _submitForm);
       $('#reset').on('click', _resetForm);
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

    function _resetForm(e) {
        e.preventDefault();
        validator.resetForm();
    }

    return {
        init: init
    };

})();

feedbackModule.init();
