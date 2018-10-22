import React, { Component } from 'react';
import './Story.css';
import Comment from './Comment';

export default class Story extends Component {
    constructor() {
        super();
        this.state = {
            showComments: false
        };
    }

    componentWillMount() {
        this.getStory(this.props.storyId);      
    }

    getStory(storyId) {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
        .then((story) => story.json())
        .then(story => {
            this.setState({story});
        });
    }
    
    render() {
        const {showComments, story} = this.state;
        let body = <div>Loading...</div>;

        if (story && story.id) {
            body = <div className="story">
                <h3 className="card-title">{story.title}</h3>
                <a href={story.url} className="card-subtitle">{story.url}</a>

                {showComments ? <div>
                    <h6 className="mt-4">Comments:</h6>
                    <table className="table table-striped">
                        <tbody>
                            {story.descendants > 0 ? story.kids.map(item => <tr><td><Comment commentId={item}/></td></tr>) : <tr><td><p>No Comments</p></td></tr>}
                        </tbody>
                    </table>
                    <a href="javascript:0" className="comments-link" onClick={() => this.setState({showComments: false})}>Hide Comments</a>
                </div> : <a href="javascript:0" className="comments-link" onClick={() => this.setState({showComments: true})}>Show Comments</a>}
                
            </div>;
        } 

        return <div className="card">
            <div className="card-body">
                {body}
            </div>
        </div>
    }
}