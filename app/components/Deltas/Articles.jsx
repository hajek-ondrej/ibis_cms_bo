import React from "react";
import creators from "../../creators/creators";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Input from "../Abstract/Input.jsx";
import Select from "../Abstract/Select.jsx";
import { FiPlus } from "react-icons/fi";
import Button from "../Abstract/Button.jsx";
import ArticleRow from "./ArticleRow.jsx";
import { Link } from "react-router-dom";
import "./board.scss";


import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

class Articles extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: []
        }

        this.changePositions = this.changePositions.bind(this)
        this.getArticleRow = this.getArticleRow.bind(this)
    }

    changePositions({oldIndex, newIndex}) {
        this.setState(Object.assign(this.state, {
            articles: arrayMove(this.state.articles, oldIndex, newIndex)
        }))
    }

    getArticleRow(item) {
        return SortableElement(({item}) => {
                const url = '/article/' + item.id;
                return <div onClick={e => this.props.goToArticle(url)} className="article-row">
                            <ArticleRow item={item} key={'article'+item.id} />
                       </div>
            }
        );
    }

    getSortableList(items) {
        return SortableContainer(({items}) => 
            <div id="article-result">
            {items.map((value, index) => {
                const Item = this.getArticleRow(value);
                return <Item key={`article-${index}`} item={value} index={index} />
            })}
            </div>
        );
    }

    componentDidMount() {
        this.props.findArticles().then(a => {
            this.setState(Object.assign(this.state, { articles: a }))

        })
    }

    render () {
        const l = this.props.translations;
        const List = this.getSortableList(this.state.articles);

        return (
            <div id="article-board">
                <div id="article-board-filters">
                    <Input type="search" id="article-search">{l.search}</Input>
                    <Select id="article-sort" options={{
                        'position': l.position,
                        'date-add': l.dateAdd,
                        'date-upd': l.dateUpd,
                        'popularity': l.popularity
                    }} default="position">{l.sort}</Select>
                    <Link to="/article"><Button id="article-add">{l.addNew}<FiPlus /></Button></Link>
                </div>

                <List items={this.state.articles} onSortEnd={this.changePositions} lockAxis="y" distance={30} />
                
            </div>
        );
        
    }
}


export default connect(
    state => {
        return {
            
        }
    },
    dispatch => {
        return bindActionCreators({
            findArticles: creators.Deltas.findArticles,
            goToArticle: creators.Deltas.goToArticle
        }, dispatch)
    }
)(Articles);