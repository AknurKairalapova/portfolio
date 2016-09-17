(function () {

    var $form = $('#addedProjectForm');
    var validateOptions = {
        rules: {
            name: "required",
            "files[]": "required",
            url: {
                required: true,
                url: true
            },
            message: "required"
        },
        messages: {
            name: "введите название",
            "files[]": "загрузите изображение",
            url: {
                required: "введите ссылку на проект",
                url: "введите корректную ссылку"
            },
            message: "введите описание проекта"
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass(errorClass).removeClass(validClass);
            if ($(element).attr('data-relative')) {
                $($(element).attr('data-relative')).addClass(errorClass).removeClass(validClass);
            }
            tooltip.init(element);
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass(errorClass).addClass(validClass);
            if ($(element).attr('data-relative')) {
                $($(element).attr('data-relative')).removeClass(errorClass).addClass(validClass);
            }
            tooltip.destroy(element);
        },
        onfocusout: false,
        onkeyup: false,
        onclick: false
    };
    var validator = $form.validate(validateOptions);


    setEvents();
    setPlaceholders();

    function setEvents() {
        $('#addProject').on('click', function () {
            $('#modal').bPopup({
                onClose: onModalClose
            });
        });

        $('#projectFileName').on('click', function (e) {
            $('#fileupload').trigger('click');
        });

        $('#fileupload').on('change', function (e) {
            setFileName(e);
            validator.element("#fileupload");
            if ($(this).valid()) {
                $('#projectFileName').focus();
            }
        });

        $form.on('submit', submitForm);
    }


    function setPlaceholders(){
        if (document.createElement("input").placeholder === undefined) {
            $('input, textarea').placeholder();
        }
    }


    function setFileName(e) {
        var filePath = e.target.value.split('\\'),
            fileName = filePath[filePath.length - 1];
        $('#projectFileName').val(fileName);
    }

    function onModalClose() {
        $form.find('[name]').each(function (index, element) {
            $(element).val('');
        });
        if(document.createElement("input").placeholder === undefined){
            $("#fileupload").replaceWith($("input[type='file']").clone(true));
        }
        validator.resetForm();
        $("input, textarea, #fileinputgroup").removeClass("error");
    }

    function submitForm(e) {
        e.preventDefault();
        validator.form();
    }

})();