"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BlogUtils {
    static massageText(htmlString, isMobile) {
        if (!htmlString)
            return (htmlString = '');
        const textElement = document.createElement('div');
        textElement.innerHTML = htmlString;
        const imgs = textElement.querySelectorAll('img');
        for (let i = 0; i < imgs.length; i++) {
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
        const as = textElement.querySelectorAll('a');
        for (let i = 0; i < as.length; i++) {
            as.item(i).setAttribute('target', '_blank');
        }
        return textElement.innerHTML;
    }
}
exports.BlogUtils = BlogUtils;
