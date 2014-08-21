/** @jsx React.DOM */

var React = require('react');


var CommentBox = require('./commentBox.js');



React.renderComponent(
    <CommentBox url="api/comments" pollInterval={8000} />,
    document.getElementById('content')
);
