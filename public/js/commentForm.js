/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
  handleSubmit: function(){
    var author = this.refs.author.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();
    if (!author || !text){
      return false;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
    return false;
  },
  render: function(){
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
      <input type="text" placeholder="Your Name" ref="author"/>
      <textarea rows="4" cols="30" placeholder="Your Comment..." ref="text"/>
      <input type="submit" value="Post"/>
      </form>
    );
  }
});
