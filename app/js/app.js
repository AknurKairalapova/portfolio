(function(){

    //Projects
    $('#addProject').on('click', function(){
        $('#modal').bPopup({
            onClose: onModalClose
        });
    });

    $('#projectFileName').on('click', function(e){
        $('#fileupload').trigger('click');
    });

    $('#fileupload').on('change', function(e){
        setFileName(e);

    });

    function setFileName(e) {
        var filePath = e.target.value.split('\\'),
            fileName = filePath[filePath.length-1];
        $('#projectFileName').val(fileName);
    }

    function onModalClose(){
        $('#addedProjectForm').find('[name]').each(function(index, element){
            $(element).val('');
        });

    }










    // 'use strict';
    //
    // projects.init();
    // feedback.init();



})();