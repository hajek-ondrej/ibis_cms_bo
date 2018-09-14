import React from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module";
import ImageFormat from "../Abstract/ImageFormat.jsx";
import 'react-quill/dist/quill.snow.css';

class Editor extends React.Component {
    constructor(props) {
        super(props);
        
        Quill.register('modules/ImageResize', ImageResize);
        const Parchment = Quill.import('parchment');

        Quill.register(new Parchment.Attributor.Style('display', 'display', { 
            whitelist: ['inline']
        }));

        Quill.register(new Parchment.Attributor.Style('float', 'float', { 
            whitelist: ['left', 'right', 'center']
        }));
        Quill.register(new Parchment.Attributor.Style('margin', 'margin', {}));
  
        Quill.register(ImageFormat, true);

        this.modules = {
            toolbar: [
              [{ 'header': [1, 2, false] }],
              ['bold', 'italic', 'underline','strike', 'blockquote'],
              [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
              ['link', 'image'],
              [{ 'align': [ ] }],

              ['clean']
            ],
            ImageResize: {}
          };
        
          this.formats = [
            'header',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image', 'align', 'direction',
            'alt', 'width', 'height', 'style'
          ];

          this.onChange = this.onChange.bind(this);
    }

    onChange(content, delta, source, editor) {
        console.log(editor.getContents())
        if (typeof this.props.onChange === 'function' && source === 'user')
            this.props.onChange(null, editor.getContents());
    }

    render () {
        return (
            <ReactQuill modules={this.modules} formats={this.formats} defaultValue={this.props.value} onChange={this.onChange} />
        );
    }
}

Editor.propTypes = {
};

export default Editor;