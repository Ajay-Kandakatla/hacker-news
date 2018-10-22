import React, { Component } from 'react';
import './Comment.css';

export default class Comment extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentWillMount() {
        this.getComment(this.props.commentId);      
    }

    getComment(commentId) {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`)
        .then((comment) => comment.json())
        .then(comment => {
            this.setState({comment});
        });
    }
    
    render() {
        const {comment} = this.state;
        let body = <div>Loading...</div>;

        if (comment && comment.id) {
            body = <div>
                <div className="content" dangerouslySetInnerHTML={{__html: comment.text}}></div>
            </div>;
        } 

        return body;
        // return <div className="card">
        //     <div className="card-body">
        //         {body}
        //     </div>
        // </div>
    }
}