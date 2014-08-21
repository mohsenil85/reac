/** @jsx React.DOM */

var $ = require('jquery');
var React = require('react');
var marked = require('marked');



module.exports = React.createClass({
    loadCommentsFromServer: function(){
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          success: function(data){
              this.setState({data: data});
          }.bind(this),
          error: function(xhr, status, err){
              console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    handleCommentSubmit: function(comment){
        var comments = this.state.data;
        var newComment = comments.concat([comment]);
        this.setState({data: newComment });
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            //todo create server that handles post
            data: comment,
            success: function(data){
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState : function(){
      return {data: []};
    },
    componentDidMount: function(){
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval)
        
    },
    render: function(){
        return (
          <div className="commentBox">
              <h1>Comments</h1>
              <CommentList data={this.state.data} />
              <CommentForm onCommentSubmit={this.handleCommentSubmit} />
          </div>
        );
    }
});

var CommentForm = React.createClass({
    handleSubmit: function(){
        var author = this.refs.author.getDOMNode().value.trim();
        var text = this.refs.text.getDOMNode().value.trim();
        if (!author || !text){
            return false;
        }
        this.props.onCommentSubmit({author: author, text: text})
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

var CommentList = React.createClass({
    render: function(){
        var commentNodes = this.props.data.map(function(comment){
            return (
                <Comment author={comment.author}>
                {comment.text}
                </Comment>
            )
        });
        return (
            <div className="CommentList">
              {commentNodes}
            </div>
        );
    }
});

var Comment = React.createClass({
    render: function(){
        var rawMarkup = marked(this.props.children.toString());
        return (
            <div className="comment">
              <h2 className="commentAuthor">
              { this.props.author }
              </h2>
              <span dangerouslySetInnerHTML={{ __html: rawMarkup }} />
            </div>
        );
    }
});
