/* eslint-disable global-require */
import React from 'react';
import { Button, Grid, Row, Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router';
import Page from '../Page/PageComponent';
import BibleMini from '../Bible/BibleMiniComponent';
import Library from '../Library/LibraryContainer';

import './Banner.scss';
import './Dashboard.scss';
import './Landing.scss';

import ThemeSquares from './ThemeSquares';

var twitterLogo = require('../../assets/svg/twitter-logo.svg');
var facebookLogo = require('../../assets/svg/facebook-logo.svg');

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
			return (<Library library={{id:1}} />);
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
  
    return (
      <Page heading='Dashboard'>
        <Grid fluid>
			<Row id="sub_be_banner" className="redBG">	
				<h1>Your place for Bible study and conversation.</h1>
			</Row>
			<Row>
          {this.props.viewer.widgets.edges.map(edge => {

            return (
              <Col md={6} key={edge.node.id}>
				<WidgetViewer {...edge.node} />
              </Col>
            );
          })}
		  </Row>
		  
		  	<Row>
				<ThemeSquares />
			</Row>
		  
		   <Row>
				<Col md={8} mdOffset={2}>
					<div className="embed-container">
						<iframe style={{width:"100%", minHeight:"300px"}} src="https://player.vimeo.com/video/120753625" frameBorder="0" webkitAllowuFullScreen="" mozAllowFullScreen="" allowFullScreen=""></iframe>
					</div>
				</Col>
			</Row>
			
			<Row className="heading-box" style={{backgroundColor:"#FFB657"}} >
				<Col md={12}>
					<h2>Launched February 20, 2015</h2>
					<p>Journey with Us While We Grow</p>
					
					<p>
						<a href="https://twitter.com/bible_exchange">
							<img className="logo center-block" src={twitterLogo} alt="follow us on Twitter" />
						</a>
						<a href="https://www.facebook.com/thebibleexchange">
							<img className="logo center-block" src={facebookLogo} alt="like us on Facebook" />
						</a>
					</p>
				</Col>	
			</Row>	
			<Row className="heading-box" style={{backgroundColor:"rgb(0, 201, 137)"}}>
				<Col md={12}>
					<h2>We Gain by Trading</h2>
					<div className="center">		
						<p>…when he was returned &hellip; he commanded these servants to be called unto him, &hellip; that he might know how much every man had gained by trading. &mdash; Luke 19:15</p>
					</div>
				</Col>
			</Row>
		  
        </Grid>
      </Page>
    );
  }
}

Dashboard.propTypes = {
    viewer: React.PropTypes.object.isRequired
  };
  
export default Dashboard;
