/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import Page from '../Page/PageComponent';
import Navigation from './Navigation';
import BibleWidget from '../Bible/WidgetComponent';
import marked from 'marked';

import './Course.scss';

class Note extends React.Component {
  render() {

    let component = null;
// type, api_request, body
    switch(this.props.note.note.output.type){

      case "GITHUB":
        component = <div dangerouslySetInnerHTML={{__html: this.props.note.note.output.body}} ></div>;
        break;

      case "BIBLE_VERSE":
        component = JSON.parse(this.props.output.body).body;
        break;

      case "STRING":
        component = <div dangerouslySetInnerHTML={{__html: this.props.note.note.output.body}} ></div>;
        break;

      case "MARKDOWN":
        component = <div dangerouslySetInnerHTML={{__html: marked(this.props.note.note.output.body)}} ></div>;
        break;

      default:
        component = this.props.note.note.output.body;

    }

    console.log(this.props.note.note.output.type);

    return (
        <div style={{padding:"15px"}}>
          {component}
        </div>
    );
  }
}

class Found extends React.Component {
  render() {

	  let next = false;
    let previous = false;

    if(this.props.viewer.lessonnote.next !== null){
      	next = { pathname:'/course/'+this.props.viewer.course.id+'/note/'+this.props.viewer.lessonnote.next.id};
    }
    if(this.props.viewer.lessonnote.previous !== null){
        previous = { pathname:'/course/'+this.props.viewer.course.id+'/note/'+this.props.viewer.lessonnote.previous.id};
    }

  let bibleWidget = null;
/*
  if(this.props.viewer.bibleChapter !== undefined){
    next = { pathname:nexturl, query: { ref: this.props.viewer.bibleChapter.nextChapter.referenceSlug } };
    previous = { pathname:previousurl, query: { ref: this.props.viewer.bibleChapter.previousChapter.referenceSlug } };
    bibleWidget =   <BibleWidget bible={this.props.viewer.bible} bibleChapter={this.props.viewer.bibleChapter} bibleVerse={null} baseUrl={"/course/"+this.props.viewer.course.id+"/step/"+this.props.viewer.lessonnote.id}/>;
  }
*/
    return (
      <Page heading={''} >
      	<div className="WidgetContainer">
              <div className="Widget">
      	  <Navigation course={this.props.viewer.course} lessonnote={this.props.viewer.lessonnote} nextStepUrl={next} previousStepUrl={previous}/>
      	  <Note note={this.props.viewer.lessonnote} />
       	</div>
        {/*}
      	<div className="Widget">
      	  {bibleWidget}
      	</div>
        */}
      	</div>
      </Page>
    );
  }

  createBodyCopy(markUp){
    return {__html:markUp};
  }
}

class Missing extends React.Component {
  render() {

    return (
      <Page heading={''} >
      	<div className="WidgetContainer">
              <div className="Widget">
                <h1>Sorry Cannot Find the Requested Course!</h1>
              </div>
       	</div>
      	<div className="Widget">

      	</div>
      </Page>
    );
  }

  createBodyCopy(markUp){
    return {__html:markUp};
  }
}

class Course extends React.Component {

  render() {
    let renderThis = <Missing />;

    if(this.props.viewer.course !== null){
      renderThis = <Found {...this.props}/>
    }

    return renderThis;
  }

}

Course.propTypes = {
  viewer: React.PropTypes.object.isRequired,
};

export default Relay.createContainer(Course, {
  initialVariables: {
    reference:"amos_1",
  	courseId: "1",
  	lessonnoteId:"1",
  	pageSize: 1,
  	opaqueCursor: "opaqueCursor",
  	courseSlug:"",
    token:"tokentoekntoekn",
    version:1
  },
  fragments: {
      viewer: () => Relay.QL`fragment on Viewer {
        course(id:$courseId){
          id
          lessons(first:100){
            edges{
              cursor
              node{
                id
                order_by
                notes(first:100){
                  edges {
                    cursor
                    node {
                      id
                      next {
                        id
                      }
                      note {
                        output {
                          id
                          type
                          api_request
                          body
                        }
                      }
                      previous {
                        id
                      }
                    }
                  }
                }
              }
            }
          }
          ${Navigation.getFragment('course')}
        }
        lessonnote( id:$lessonnoteId) {
          id
          lesson_id
          order_by
          next {
            id
          }
          previous {
            id
          }
          note {
            id
            output{
              type
              api_request
              body
            }
          }
          ${Navigation.getFragment('lessonnote')}
        }
        bible {
      	  ${BibleWidget.getFragment('bible')}
      	}
        bibleChapter(reference:$reference){
          nextChapter {referenceSlug}
          previousChapter {referenceSlug}
          ${BibleWidget.getFragment('bibleChapter')}
        }
      }`,
    },
});
