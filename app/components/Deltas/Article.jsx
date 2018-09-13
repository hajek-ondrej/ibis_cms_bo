import React from "react";
import Input from "../Abstract/Input.jsx";
import Switch from "../Abstract/Switch.jsx";
import "./article.scss";
import Editor from "./Editor.jsx";
import { connect } from "react-redux";
import { Prompt } from "react-router-dom";
import { bindActionCreators } from "redux";
import creators from "../../creators/creators.js";
import { toast } from "react-toastify";
import { FiAlertCircle, FiSave, FiCheckCircle } from "react-icons/fi";
import Loader from "../Loader.jsx";
import Button from "../Abstract/Button.jsx";

class Article extends React.Component {

    constructor(props) {
        super(props);

        this.changeTitle = this.changeTitle.bind(this)
        this.changePublished = this.changePublished.bind(this)
        this.changeDelta = this.changeDelta.bind(this)

        this.updateArticle = this.updateArticle.bind(this)
        this.saveArticle = this.saveArticle.bind(this)
        
        this.state = {
            changed: false,
            loading: true
        }
    }

    componentDidMount() {
        if (this.props.id) {
            this.props.getArticle(this.props.id).then(
                s => this.setState(Object.assign(this.state, { loading: false })),
                f => toast.error(<div><FiAlertCircle />{this.props.translations.loadError}</div>)
            );
        }
        else {
            this.setState(this.state, { loading: false })
        }
    }

    saveArticle() {
        this.props.saveArticle().then(
            s => {
                this.setState(Object.assign(this.state, { changed: false }))
                toast.success(<div><FiCheckCircle />{this.props.translations.saveSuccess}</div>)
            },
            f => toast.error(<div><FiAlertCircle />{this.props.translations.saveError}</div>)
        )
    }

    updateArticle(value) {
        this.setState(Object.assign(this.state, { changed: true }))
        this.props.onChangeContent(value);
    }

    changeTitle(event, value) {
        this.updateArticle({ title: value });
    }

    changePublished(event, value) {
        this.updateArticle({ published: value });
    }

    changeDelta(event, value) {
        this.updateArticle({ delta: value });
    }

    render () {

        const l = this.props.translations;
        return this.state.loading ? 
          <Loader />
        : (
            <div id="article">
                <Prompt when={this.state.changed} message={l.unsavedData} />
                <Input type="text" id="article-title" value={this.props.title} onChange={this.changeTitle}>{l.editTitle}</Input>
                <Switch id="article-published" onChange={this.changePublished} checked={this.props.published}>{l.publish}</Switch>
                <Editor onChange={this.changeDelta} value={this.props.delta} /> 

                <div className="article-actions">
                    <Button id="article-save" disabled={!this.state.changed} onClick={this.saveArticle}>{l.save}<FiSave /></Button>
                </div>
            </div>
        );
    }
}

Article.propTypes = {
};

export default connect(
    state => {
        return {
            title: state.Deltas.stub.title,
            published: state.Deltas.stub.published,
            delta: state.Deltas.stub.delta
        }
    },
    dispatch => {
        return bindActionCreators({
            onChangeContent: creators.Deltas.changeStub,
            getArticle: creators.Deltas.getArticle,
            saveArticle: creators.Deltas.saveArticle
        }, dispatch)
    }
)(Article)