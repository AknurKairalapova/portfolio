var Tooltip = function(element)  {
    this.element = element;
    this.init = _init;
    this.destroy = _destroy;

    function _init(){
        var that = this;
        $(that.element).next().addClass('tooltip');
        _setTooltip(that.element);
    }

    function _destroy(){
        var that = this;
        $(that.element).next().removeClass('tooltip tooltip-left tooltip-right');
        $(that.element).next().removeAttr('style');
    }

    function _setTooltip(element) {
        var width = $(element).next().outerWidth(),
            indent = 0;

        if($(element).attr('data-relative')) {
            var relative = $(element).attr('data-relative');
            var relWidth = $(relative).outerWidth();
            indent = - (relWidth + width / 2 + 8) + 'px';
            _setPosition(element, indent);
        } else {
            indent = - (width + 10) + 'px';
            _setPosition(element, indent);
        }
    }

    function _setPosition(element, indent) {
        var attr = $(element).attr('data-placement');
        $(element).next().css(attr === 'left' ? 'margin-left': 'margin-right', indent);
        $(element).next().addClass(attr === 'left' ? 'tooltip-left' : 'tooltip-right');
    }
};