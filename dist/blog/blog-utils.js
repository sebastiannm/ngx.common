"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BlogUtils = /** @class */ (function () {
    function BlogUtils() {
    }
    BlogUtils.massageText = function (htmlString, isMobile) {
        if (!htmlString)
            return (htmlString = '');
        var textElement = document.createElement('div');
        textElement.innerHTML = htmlString;
        var imgs = textElement.querySelectorAll('img');
        for (var i = 0; i < imgs.length; i++) {
            imgs.item(i).src = imgs
                .item(i)
                .src.replace('downloads.contentful', 'images.contentful');
            if (!imgs.item(i).src.includes('.gif')) {
                if (isMobile) {
                    imgs.item(i).src += '?w=700';
                }
                else {
                    imgs.item(i).src += '?w=1500';
                }
            }
        }
        var as = textElement.querySelectorAll('a');
        for (var i = 0; i < as.length; i++) {
            as.item(i).setAttribute('target', '_blank');
        }
        return textElement.innerHTML;
    };
    return BlogUtils;
}());
exports.BlogUtils = BlogUtils;
//# sourceMappingURL=blog-utils.js.map