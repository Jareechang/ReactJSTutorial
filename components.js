$(function(){
    
    // Comment box componenet    
    var CommentBox = React.createClass({

        getInitialState: function() {
          return {data: []};
        },

        loadCommentsFromServer: function() {
           
           $.ajax({
             url: this.props.url,
             dataType: 'json',
             cache: false,

             success: function(data) {                
               this.setState({data: data});
             }.bind(this),
             
             error: function(xhr, status, err) {
               console.error(this.props.url, status, err.toString());
             }.bind(this)
           });

         },

         componentDidMount: function() {
             this.loadCommentsFromServer();
             setInterval(this.loadCommentsFromServer, this.props.pollInterval);
        },

        render: function(){
            return (
                <div className="commentBox">
                    <h1>Comments</h1>
                    <CommentList data={this.state.data} />
                    <CommentForm />
                </div>
            );
        }

    });


    //comment List component 
    var CommentList = React.createClass({
        render: function(){
            var commentNodes = this.props.data.map(function(comment){

                return (
                    <Comment author={comment.author}>
                        {comment.text}
                    </Comment>
                )           
                     
            });
            return(
                <div className="commentList">
                    {commentNodes}
                </div>
            );
        }
    })

    // Comment form component
    var CommentForm = React.createClass({
        render: function(){
            return(
                <div className="commentForm">
                    This is the comment form
                </div>
            )

        }

    })

    // Comment data component 

    var Comment = React.createClass({
        render: function(){
            return(
                <div className="comment">
                    <h1 className="commentAuthor">
                        {this.props.author}
                    </h1>
                    {this.props.children}
                </div>
            );
        }

    })

    // –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // Rendering the componenents
    // –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    React.render(
        <CommentBox url="comments.json"  pollInterval={2000}  />,
        document.getElementById('content')
    );

})