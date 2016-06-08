import React from 'react';
import NotebookStore from '../../stores/NotebookStore';
import LibraryActionCreators from '../../actions/LibraryActionCreators';
import Loading from '../Loading';
import { Link } from 'react-router';
import Page from '../Notes/Note';
import Navigator from '../Navigator';
import AppConstants from '../../util/AppConstants';

import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
 
var twitterLogo = require('../../assets/svg/twitter-logo.svg');

require('../../stylesheets/typography-textbook.scss');
require('../../stylesheets/social-media.scss');
require('../../stylesheets/sidebar.scss');

class NotebookComponent extends React.Component {
	
  render() {
	
	let store = this.state.store;
	let data = store.data;
	let currentPage = null;
	
	if(store.loading){
		this.loading();
	}else if(store.error){
		this.error();
	}else{
		
		currentPage = this.props.params.note;
		
		if(currentPage == undefined){
			currentPage = 1;
		}
		
		let title = data.title.toLowerCase().replace(/ /g, "-");
		this.baseUrl = "/notebooks/"+data.id+"-"+title;
		
		this.success(currentPage);
		
		this.maxPages = data.notes.length;
	}
	
    return (
		<div>		
		{this.state.content}
		</div>
    )
  }

	loading(){
		this.state.content = <h2 style={{textAlign:'center'}}>Loading...<Loading /></h2>;
	}
	error(){
		this.state.content = this.state.notebook.error.message + " ------- <a href='" + this.state.notebook.error.documentation_url + "'>Read More</a>";
	}
	success(currentPage){		
		this.state.content = <Template data={this.state.store.data} page={this.state.store.data.notes[currentPage-1]} currentPage={currentPage} baseUrl={this.baseUrl} maxPages={this.maxPages}/>;
	}
	
}

class Template extends React.Component {
	
  render() {
	
    return (
		<Grid fluid>
			<Row>
				<Col id="sidebar" md={3} >
					<Navigator data={this.props.data} pages={this.props.data.notes} maxPages={this.props.maxPages} currentPage={this.props.currentPage} baseUrl={this.props.baseUrl}/>
					<Sidebar data={this.props.data} page={this.props.page}/>
				</Col>
				<Col md={9} id="content">					
					<Main page={this.props.page} />
					{/*
					<div className="panel panel-default panel-study-green">
						<div className="panel-heading">
							<h2 className="panel-title">Comments</h2>
						</div>
						<div className="panel-body">
							<p><em className="text-muted">No comments, yet.</em></p>
						</div>
					</div>		
					*/}
				</Col>
			</Row>			
		</Grid>
		
    );
  }
  
}

class Sidebar extends React.Component {
	
  render() {

    return (
					<div className="sidebar">
						<div id="masthead" className="site-header" role="banner">		
							<div className="sidebar-block orangeBG">
								<h2>{this.props.data.title}	</h2>
							</div>
							<img className="study-default-image" src="http://bible.exchange/svg/be-logo.svg" name="Bible exchange" alt="Bible exchange" />
							<a id="secondary-toggle" data-toggle="collapse" href="#sidebar-collapse" aria-expanded="false" aria-controls="collapseExample" className="visible-xs visible-sm">
								<div className="sidebar-block greenBG">
									<h2><Glyphicon glyph="menu-down" /></h2>
								</div>
							</a>		
						</div>
			
						<div id="secondary" className="secondary">
							<div id="sidebar-collapse" className="collapse in">	
								<div className="sidebar-block blueBG">
									<Link to={this.props.page.verse.url}><h2>
									<Glyphicon glyph="book" />
									 {this.props.page.verse.reference} {this.props.page.verse.t}</h2></Link>
								</div>
									
								<div className="sidebar-block greenBG">
									<h2>Share</h2>								
									<div className="social-sharing ">
	<SocialMediaLogos options={{type:"twitter", text:"Check out this note at http://bible.exchange/&amp;url=http://bible.exchange/study/18-benefits-of-having-been-tested-in-battle&amp;via=bible_exchange"}} />
	<SocialMediaLogos options={{type:"facebook", share:"http://bible.exchange/study/18-benefits-of-having-been-tested-in-battle"}} />
	<SocialMediaLogos options={{type:"googleplus", url:"http://bible.exchange/study/18-benefits-of-having-been-tested-in-battle"}} />
	<SocialMediaLogos options={{type:"pinterest",url:"http://bible.exchange/study/18-benefits-of-having-been-tested-in-battle", media:"http://bible.exchange/images/be_logo.png", description:"Benefits+of+having+Been+Tested+in+Battle posted by http://bible.exchange/@stephenjr" }} />	
									</div>					
								</div>
									
									{this.linkToRelated(this.props.page.relatedObject)}
								
								<div className="sidebar-block greenBG"></div>
							</div>	
						</div>
					</div>
    );
  }
  
  
  
  shareToTwitter(e){
	  e.preventDefault();
	  window.open(this.href, 'mywin','left=50,top=50,width=600,height=350,toolbar=0'); 
	  return false;
  }
  
  linkToRelated(r){
	  if(r !== undefined){
	  return (<div className="sidebar-block blueBG">	
				<a href={this.props.page.relatedObject.url} >{this.props.page.relatedObject.url}</a>
			</div>);
	  }
  }
  
}

class Main extends React.Component {
	
  render() {
	
    return (<div className="textbook">		  
				<div>
					<div className="h1-box">
						<h1><Glyphicon glyph="link" />{this.props.page.body}</h1>					
						<div className="h1-underline"></div>
						<div className="h1-underline"></div>
						<div className="h1-underline"></div>
					</div>	
				</div>		
				<article><Page {...this.props.page} /></article>	
			</div>
    );
  }
  
}

class SocialMediaLogos extends React.Component {
	
  render() {
	
	let logo = '';
	let className="";
	let config = {
		url:''
	};
	
	let options = {
		fill:"#ffffff",
		width:'50px',
		height:'50px'
	};
	
	switch(this.props.options.type){
		
		case 'twitter':
			logo = this.twitter(options);
			className="social-sharing-buttons social-twitter";
			config.url = "https://twitter.com/intent/tweet?text="+this.props.options.text;
			break;
		case 'facebook':
			logo = this.facebook(options);
			className="social-sharing-buttons social-facebook";
			config.url = "http://www.facebook.com/sharer/sharer.php?u="+this.props.options.share;
			break;
		case 'googleplus':
			logo = this.googleplus(options);
			className="social-sharing-buttons social-gplus";
			config.url = "http://plus.google.com/share?url="+this.props.options.url;
			break;
		case 'pinterest':
			logo = this.pinterest(options);
			className="social-sharing-buttons social-pinterest";
			config.url = "http://pinterest.com/pin/create/button/?url="+this.props.options.url+"&amp;media="+this.props.options.media+"&amp;description="+this.props.options.description;
			break;
		default:
			return null;
		
	}
	
    return (<a className={className} href={config.url} dangerouslySetInnerHTML={logo}></a>);
  }
  
  facebook(options) { 
	
	return {__html: '<svg enable-background="new 0 0 32 32" version="1.1" width="'+options.width+'" height="'+options.height+'" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g fill="'+options.fill+'"><path d="M28,1c1.654,0,3,1.346,3,3v24c0,1.654-1.346,3-3,3H4c-1.654,0-3-1.346-3-3V4c0-1.654,1.346-3,3-3H28 M28,0H4   C1.8,0,0,1.8,0,4v24c0,2.2,1.8,4,4,4h24c2.2,0,4-1.8,4-4V4C32,1.8,30.2,0,28,0L28,0z"/><path d="M13.597,25.261h3.827v-9.262h2.553l0.338-3.191h-2.891l0.004-1.598c0-0.832,0.079-1.278,1.273-1.278h1.596V6.739h-2.554   c-3.067,0-4.146,1.549-4.146,4.152v1.916h-1.912v3.192h1.912V25.261z"/></g></svg>'}; 
  }
  
  googleplus(options) { 
  
	return {__html: '<svg enable-background="new 0 0 32 32" version="1.1" width="'+options.width+'" height="'+options.height+'" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g fill="'+options.fill+'"><g><path d="M28,1c1.654,0,3,1.346,3,3v24c0,1.654-1.346,3-3,3H4c-1.654,0-3-1.346-3-3V4c0-1.654,1.346-3,3-3H28 M28,0H4    C1.8,0,0,1.8,0,4v24c0,2.2,1.8,4,4,4h24c2.2,0,4-1.8,4-4V4C32,1.8,30.2,0,28,0L28,0z"/></g><path d="M18.204,7.182c0,0-4.049,0-5.435,0c-2.486,0-4.827,1.745-4.827,3.926c0,2.229,1.695,3.962,4.224,3.962   c0.176,0,0.347-0.04,0.515-0.052c-0.166,0.313-0.28,0.65-0.28,1.017c0,0.62,0.332,1.114,0.753,1.524   c-0.316,0-0.625,0.004-0.961,0.004c-3.08,0.001-5.45,1.961-5.45,3.995c0,2.003,2.599,3.258,5.679,3.258   c3.512,0,5.451-1.994,5.451-3.997c0-1.606-0.474-2.568-1.939-3.607c-0.502-0.354-1.46-1.217-1.46-1.725   c0-0.594,0.169-0.887,1.065-1.587c0.916-0.716,1.566-1.57,1.566-2.743c0-1.394-0.6-3.095-1.766-3.095h1.984L18.204,7.182z    M16.38,20.473c0.042,0.187,0.068,0.378,0.068,0.572c0,1.619-1.045,2.884-4.038,2.884c-2.129,0-3.666-1.347-3.666-2.966   c0-1.586,1.907-2.908,4.037-2.884c0.495,0.005,0.959,0.086,1.379,0.22C15.316,19.103,16.145,19.558,16.38,20.473z M12.97,14.434   c-1.429-0.041-2.788-1.598-3.034-3.474c-0.246-1.878,0.712-3.314,2.141-3.272c1.428,0.044,2.788,1.55,3.034,3.426   C15.357,12.991,14.399,14.476,12.97,14.434z"/><polygon points="22.612,14.23 22.612,11.585 20.849,11.585 20.849,14.23 18.204,14.23 18.204,15.993 20.849,15.993 20.849,18.638    22.612,18.638 22.612,15.993 25.257,15.993 25.257,14.23  "/></g></svg>'}; 
  }
  
  pinterest(options) { 
	
	return {__html: '<svg enable-background="new 0 0 32 32" version="1.1" width="'+options.width+'" height="'+options.height+'" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g  fill="'+options.fill+'"><path d="M28,1c1.654,0,3,1.346,3,3v24c0,1.654-1.346,3-3,3H4c-1.654,0-3-1.346-3-3V4c0-1.654,1.346-3,3-3H28 M28,0H4   C1.8,0,0,1.8,0,4v24c0,2.2,1.8,4,4,4h24c2.2,0,4-1.8,4-4V4C32,1.8,30.2,0,28,0L28,0z"/><path d="M24.002,12.466c0,4.658-2.59,8.139-6.407,8.139c-1.283,0-2.488-0.693-2.901-1.481c0,0-0.69,2.736-0.835,3.264   c-0.514,1.866-2.027,3.733-2.144,3.886c-0.082,0.106-0.263,0.073-0.282-0.068c-0.033-0.238-0.418-2.592,0.036-4.513   c0.228-0.964,1.527-6.471,1.527-6.471s-0.379-0.758-0.379-1.879c0-1.76,1.02-3.074,2.29-3.074c1.08,0,1.601,0.81,1.601,1.782   c0,1.086-0.691,2.71-1.048,4.214c-0.298,1.26,0.632,2.288,1.874,2.288c2.25,0,3.765-2.89,3.765-6.314   c0-2.602-1.752-4.551-4.941-4.551c-3.601,0-5.846,2.686-5.846,5.687c0,1.035,0.306,1.765,0.784,2.329   c0.219,0.26,0.25,0.364,0.17,0.662c-0.058,0.219-0.187,0.744-0.243,0.953c-0.079,0.301-0.323,0.408-0.594,0.297   c-1.659-0.677-2.432-2.495-2.432-4.537c0-3.373,2.845-7.418,8.487-7.418C21.019,5.663,24.002,8.943,24.002,12.466z"/></g></svg>'}; 
  }
  
  twitter(options) { 
 
	return {__html: '<svg enable-background="new 0 0 32 32" version="1.1" width="'+options.width+'" height="'+options.height+'" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g  fill="'+options.fill+'"><path d="M28,1c1.654,0,3,1.346,3,3v24c0,1.654-1.346,3-3,3H4c-1.654,0-3-1.346-3-3V4c0-1.654,1.346-3,3-3H28 M28,0H4   C1.8,0,0,1.8,0,4v24c0,2.2,1.8,4,4,4h24c2.2,0,4-1.8,4-4V4C32,1.8,30.2,0,28,0L28,0z"/><path d="M18.328,8.56c-1.663,0.605-2.714,2.166-2.594,3.874l0.04,0.659l-0.665-0.081c-2.421-0.309-4.537-1.358-6.333-3.121   L7.897,9.017L7.671,9.663c-0.479,1.439-0.173,2.96,0.825,3.982c0.532,0.565,0.412,0.646-0.505,0.309   c-0.319-0.107-0.599-0.188-0.625-0.148c-0.093,0.095,0.226,1.318,0.479,1.803c0.346,0.673,1.051,1.331,1.823,1.722l0.652,0.309   l-0.771,0.013c-0.745,0-0.771,0.013-0.691,0.297c0.266,0.874,1.317,1.803,2.488,2.206l0.825,0.282l-0.718,0.431   c-1.064,0.62-2.315,0.969-3.566,0.995c-0.599,0.013-1.091,0.067-1.091,0.108c0,0.134,1.624,0.887,2.568,1.184   c2.834,0.874,6.2,0.497,8.728-0.996c1.796-1.063,3.592-3.175,4.431-5.22c0.453-1.089,0.905-3.08,0.905-4.034   c0-0.619,0.04-0.7,0.785-1.439c0.439-0.43,0.851-0.901,0.931-1.036c0.133-0.256,0.119-0.256-0.559-0.027   c-1.131,0.404-1.291,0.35-0.731-0.255c0.412-0.43,0.905-1.211,0.905-1.439c0-0.04-0.199,0.027-0.426,0.148   c-0.239,0.135-0.771,0.337-1.171,0.457L22.44,9.543l-0.652-0.444c-0.359-0.242-0.864-0.511-1.131-0.592   C19.978,8.318,18.94,8.345,18.328,8.56z"/></g></svg>'}; 
  }
  
}

module.exports = NotebookIndex;