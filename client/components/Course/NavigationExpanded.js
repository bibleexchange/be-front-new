import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from "react-router";

class ChaptersList extends React.Component {
  
    constructor(props) {
		super(props);	
	  }
  
  render() {
	var module = this.props.module;
	var chapters  = [];

	for (var i=1; i <= module.chapters.edges.length; i++) {
		chapters.push(i);
	}
	
	const toggle = this.props.toggle;
	const getChapter = this.props.getChapter;
	
    return (
		<div>
			{chapters.map(function(chapter) {
			  return (
				<li className="square-list" key={Math.random()+chapter}>
					<Link to={"/bible/"+module.title+"/"+chapter} id={chapter} onClick={toggle.bind(this)}>
						{chapter}
					</Link>
				</li>
			 )})}
		</div>			

    )
  }
}

class Module extends React.Component {
  
  constructor(props) {
	super(props);	
	this.state = {
		  collapsed: false,
		};
  }
	
  toggleChapter(e) {
	e.preventDefault(); 
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }
  
  toggleChapterAlways() {
    const collapsed = false;
    this.setState({collapsed});
	this.props.closeAll();
  }
  
  render() {
	const { collapsed } = this.state;
	const chaptersClass = collapsed ? "collapse" : "";
	const module = this.props.module.node;
	
	return (
		<div className="btn-group" key={module.id}>
			  <a className="btn btn-default" onClick={this.toggleChapter.bind(this)} href="#" style={{width:'75px', height:'50px', overflow:'hidden'}}>
				<strong>{module.title.substring(0,4)}</strong>
			  </a>
			  <ul className={"dropdown-menu" + chaptersClass} role="menu" >
				
				<ChaptersList module={module} toggle={this.toggleChapterAlways.bind(this)} />

			  </ul>
			</div>
		)
  }
}

class ModulesList extends React.Component {
  
  render() {
	
	const modules = this.props.modules;
	const closeAll = this.props.closeAll;
	const getChapter = this.props.getChapter;

    return (
		<div>
			{modules.map(function(module) {
			  return <Module module={module} key={module.node.id} closeAll={closeAll} />
			 })}
		</div>
    )
  }
}

class NavigationExpanded extends React.Component {
  
	constructor(props) {
		super(props);	
		this.state = {showModal:false};
	  }
	
  toggleModal() {
    const show = !this.state.showModal;
    this.setState({showModal:show});
  }
  
  close(){
	const show = !this.state.showModal;
    this.setState({showModal:show});
  }
  
  render() {
		
		let rand = ()=> (Math.floor(Math.random() * 20) - 10);
		
		const modalStyle = {
		  position: 'relative',
		  zIndex: 1040,
		  top: 100, bottom: 0, left: 0, right: 0,
		  verticalAlign: 'middle'
		};

		const backdropStyle = {
		  position: 'fixed',
		  top: 0, bottom: 0, left: 0, right: 0,
		  zIndex: 'auto',
		  backgroundColor: '#000',
		  opacity: 0.5
		};
		
		const buttonStyle = {
		  border:'none', background:'transparent'
		};
		

		const dialogStyle = function() {

		  return {
			position: 'absolute',
			border: '1px solid #e5e5e5',
			backgroundColor: 'white',
			boxShadow: '0 5px 15px rgba(0,0,0,.5)',
			padding: 20
		  };
		};
		
    return (
	 
		<span>
			<Button onClick={this.toggleModal.bind(this)} style={buttonStyle}>
			  <span className="glyphicon glyphicon-th"></span>
			</Button>
	        
			<Modal
			  aria-labelledby='modal-label'
			  style={modalStyle}
			  backdropStyle={backdropStyle}
			  show={this.state.showModal}
			  onHide={this.close.bind(this)}
			  bsSize='lg'
			>
			  <div style={dialogStyle()} >
				
				<Button onClick={this.toggleModal.bind(this)}>
				  <span ariaHidden="true">&times;</span>
				</Button>
				
				<h4 className="modal-title" id="myModalLabel">
					Choose a book and chapter to open
				</h4>
				
				<ModulesList modules={this.props.course.modules.edges} closeAll={this.close.bind(this)}/>	
				
			  </div>
			</Modal>
		</span>
    )
  }
}

module.exports = NavigationExpanded;