import React from "react";
import "./article.scss";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi"
import moment from "moment"

class Article extends React.Component {

    render () {
        const date = moment(this.props.item.date)
        return (
            <div>
                {this.props.item.title}
                <div className="details">
                    <span>{date.format('LLL')}</span>
                    <FiTrendingUp />
                </div>
            </div>
        );
    }
}

Article.propTypes = {
};

export default Article;