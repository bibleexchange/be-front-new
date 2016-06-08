/* eslint-disable global-require */
import React from 'react';
import { Button, Grid, Row, Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router';
import Page from '../Page/PageComponent';
import BibleMini from '../Bible/BibleMiniComponent';
import Library from '../Library/LibraryComponent';

import './Dashboard.scss';
import './Landing.scss';

class WidgetViewer extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      open: true
    };
  }

  render() {
	  
    return (
      <div>
        <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
          { this.props.name }
        </Button>
        <Panel collapsible expanded={this.state.open}>
			<Link to={this.props.url} >Go to</Link> { this.props.description }
			
			{this.getWidget(this.props.name)}
			
        </Panel>
      </div>
    );
  }
  
  getWidget(name){
	  
	  const viewer = {
		  bibleNavs: [
		  {id:'1',body:'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.',url:'/bible/genesis/1/1',chapterURL:'/bible/genesis/1',v:'1',reference:'Genesis 1:1'},
		  {id:'2',body:'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.e',url:'/bible/genesis/1/2',chapterURL:'/bible/genesis/2',v:'2',reference:'Genesis 1:2'}
		  
		  ]		  
	  };

	  switch(name) {
		case "Notebooks":
			return (<Library library={this.props.library} />);
			break;
		case "Bible":
			return (<BibleMini viewer={viewer}/>);
			break;
		default:
			return null;
	}
	  
  }
  
} 

class Dashboard extends React.Component {
  render() {
  console.log(this.props);
    return (
      <Page heading='Dashboard'>
      	<div className="WidgetContainer">
	        {this.props.viewer.widgets.edges.map(edge => {
		        return (
		          <div className="Widget" key={edge.node.id}>
								<WidgetViewer {...edge.node} />
		          </div>
		        );
	        })}
	      </div>
      </Page>
    );
  }
}

Dashboard.propTypes = {
  viewer: React.PropTypes.object.isRequired
};
  
export default Dashboard;
