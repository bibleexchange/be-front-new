import React from 'react'
import Relay from 'react-relay'
import BookMarksWidget from './BookMarksWidget'

class UserLoggedIn extends React.Component {

  componentWillMount(){
    this.state = {
      bookmarks:false
    }
  }

  render() {

  let name = ''

  if(this.props.user !== null){
    name = this.props.user.name
  }

  let bookmarksStyle = {
    display:"none"
  }

  if(this.state.bookmarks){
    bookmarksStyle.display = "block"
  }

    return (
    <ul>
		<li>
		  <button onClick={this.props.handleLogout}>
			{name}	(Logout)
		  </button>
		</li>
		<li>
    <button onClick={this.toggleBookmark.bind(this)} >
       bookmarks
    </button>
      <div id="bookmarks" style={bookmarksStyle} onBlur={this.toggleBookmark.bind(this)} >
  		  <button onClick={this.props.handleBookmark} >
  			   bookmark
  		  </button>
        <BookMarksWidget navs={this.props.navs} />
      </div>
		</li>
	 </ul>
    )
  }

  toggleBookmark(){
    this.setState({bookmarks: !this.state.bookmarks})
  }

}

UserLoggedIn.propTypes = {
    user: React.PropTypes.object.isRequired
  }

export default Relay.createContainer(UserLoggedIn, {
  initialVariables: {
	slug:''
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
      	id
      	email
      	name
      	authenticated
        token
      }
    `,
  },
})
