import React from 'react';
import NoteStore from '../../stores/NoteStore';
import ActionCreators from '../../actions/NoteActionCreators';
import Loading from '../Loading';
import { Link } from 'react-router';
import { safeUrl } from 'util/MyHelpers';
import Note from './Note';

class Index extends React.Component {

	componentWillMount(){
		this.state = this._getState();
		ActionCreators.getNote(this.props.params.note);
	}
	
	_getState() {
		return {
			note:NoteStore.getAll(),
			content: ''
		};
	}

	componentDidMount(){	
		this.changeListener = this._onChange.bind(this);	
		NoteStore.addChangeListener(this.changeListener);
	}
	
	_onChange(){	
		let newState = this._getState();
		this.setState(newState);		
	}
	
	componentWillUnmount(){
		NoteStore.removeChangeListener(this.changeListener);
	}
	
	componentWillReceiveProps(newProps){
		ActionCreators.getNote(newProps.params.note);
	}
	
  render() {
	
	let r = this.state.note;
	let content = '';
	
	if(r.loading){
		this.loading();
	}else if(r.error){
		this.error();
	}else{
		this.success();
	}

    return (
		<div>
			<hr />
				<div className="container">
					<Link to="/" > BACK </Link>{/*///this.context.router.goBack()*/}
				</div>
			<hr />
			
			<div className="container">
				{this.state.content}
			</div>	
		
		</div>
    )
  }

	loading(){
		console.log('loading data...');
		this.state.content = <h2 style={{textAlign:'center'}}>Loading...<Loading /></h2>;
	}
	
	error(){
		console.log('Something went wrong :(', this.state.note.error);		
	}
	
	success(){
		this.state.content = <Note {...this.state.note} />;
	}
  
}

module.exports = Index;