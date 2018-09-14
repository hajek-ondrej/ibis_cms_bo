const BaseImageFormat = window.Quill.import('formats/image');
const __attributeList = [
  'alt',
  'height',
  'width',
  'style'
];

export default class ImageFormat extends BaseImageFormat {

  static formats(domNode) {
      
    return __attributeList.reduce(function(formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }

  format(name, value) {
      
    if (__attributeList.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}