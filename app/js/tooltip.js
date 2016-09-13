var tooltip = (function () {
    return {
        init: init,
        destroy: destroy
    };

    function init(element) {
        $(element).next().addClass('tooltip');
        setTooltip(element);
    }

    function destroy(element) {
        $(element).next().removeClass('tooltip tooltip-left tooltip-right');
        $(element).next().removeAttr('style');
    }

    function setTooltip(element) {
        var width = 0,
            indent = 0;

        width = $(element).attr('data-relative') ? $($(element).attr('data-relative')).outerWidth() :
            $(element).parent().outerWidth();

        indent = width + 10 + 'px';
        setPosition(element, indent);
    }

    function setPosition(element, indent) {
        var attr = $(element).attr('data-placement');
        $(element).next().addClass(attr === 'left' ? 'tooltip-left' : 'tooltip-right');
        $(element).next().css(attr === 'left' ? 'margin-right' : 'margin-left', indent);
    }
})();