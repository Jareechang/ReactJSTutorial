//comment List component 
var CommentList = React.createClass({
    render: function(){
        return (
            <div className="commentList">
                <Comment author="Moby dick"> the great Whale Survives!</Comment>
                <Comment author="Heminigway"> Woah dude! surfs up</Comment>
            </div>
        )
    }
})