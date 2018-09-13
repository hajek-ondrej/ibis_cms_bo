import React from "react";
import ReactQuill from "react-quill";

class Editor extends React.Component {
    constructor(props) {
        super(props);
        

        this.modules = {
            toolbar: [
              [{ 'header': [1, 2, false] }],
              ['bold', 'italic', 'underline','strike', 'blockquote'],
              [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
              ['link', 'image'],
              [{ 'align': [] }],

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