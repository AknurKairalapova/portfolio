var tooltip = function(){
    return {
        init: _init,
        destroy: _destroy
    };

    function _init(element){
        $(element).next().addClass('tooltip');
        _setTooltip(element);
    }

    function _destroy(element){
        $(element).next().removeClass('tooltip tooltip-left tooltip-right');
        $(element).next().removeAttr('style');
    }

    function _setTooltip(element) {
        var width = 0,
            indent = 0;

        width = $(element).attr('data-relative') ? $($(element).attr('data-relative')).outerWidth() : 
                                                   $(element).parent().outerWidth();

        indent = width + 10 + 'px';
        _setPosition(element, indent);
    }

    function _setPosition(element, indent) {
        var attr = $(element).attr('data-placement');
        $(element).next().addClass(attr === 'left' ? 'tooltip-left' : 'tooltip-right');
        $(element).next().css(attr === 'left' ? 'margin-right': 'margin-left', indent);
    }
}();