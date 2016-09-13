(function () {

    var $form = $('#feedbackForm');
    var validateOptions = {
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            },
            messagetext: "required",
            code: "required"
        },
        messages: {
            name: "введите имя",
            email: {
                required: "введите email",
                email: "введите корректный email"
            },
            messagetext: "задайте вопрос",
            code: "введите код капчи"
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass(errorClass).removeClass(validClass);
            tooltip.init(element);
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass(errorClass).addClass(validClass);
            tooltip.destroy(element);
        }
    };
    var validator = $form.validate(validateOptions);


    setupListeners();
    setPlaceholders();


    function setupListeners() {
        $form.on('submit', submitForm);
        $('#reset').on('click', resetData);
    }

    function setPlaceholders() {
        if (document.createElement("input").placeholder === undefined) {
            $('input, textarea').placeholder();
        }
    }

    function submitForm(e) {
        e.preventDefault();
        validator.form();
    }

    function resetData(e) {
        e.preventDefault();
        $('form').find('[name]').each(function (index, element) {
            $(element).val('');
        });
        validator.resetForm();
    }
})();
