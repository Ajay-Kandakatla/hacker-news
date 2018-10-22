import React, { Component } from 'react';
import Story from './Story';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      stories: []
    };
  }

  componentWillMount() {
    this.getStories();
  }

  getStories() {
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then((stories) => stories.json())
      .then(response => {
        const stories = response.slice(0, 10);
        this.setState({stories});
      });
  }


  render() {
    const {stories} = this.state;
    console.log("stories are", stories);
    return (
      <div className  ="App">
        {stories.map(story => <Story storyId={story} key={story.id ? story.id : story}/>)}
      </div>
    );
  }
}

export default App;
