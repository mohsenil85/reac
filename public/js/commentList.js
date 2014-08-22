/** @jsx React.DOM */

var $ = require('jquery');
var React = require('react');

var Comment = require('./comment.js');

module.exports = React.createClass({
  render: function(){
      var commentNodes = $.map(this.props.data, function(comment, index){
        return (
          <Comment key={index}  author={comment.author}>
          {comment.text}
          </Comment>
        );
      });
    return (
      <div className="commentList">
      {commentNodes}
      </div>
    );
  }
});

