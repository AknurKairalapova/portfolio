var feedbackModule = (function(){

    var init = function(){
        _setupListeners();

    };

    function _setupListeners(){
        $('#feedbackForm').validate({
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
            }
        });
       $('#feedbackForm').on('submit', _submitForm);
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

feedbackModule.init();
