/* eslint-disable global-require */
import React from 'react';
import QuizComponent from './QuizComponent';
import marked from 'marked';

class LessonBody extends React.Component {

  render() {

    let language = this.props.language
    let text = "Swahili"

    if(this.props.language === "eng"){
      text = "Swahili"
    }else{
      text = "English"
    }

    let button = null

    if(this.props.media.trans !== false){
      button = <button onClick={this.handleLanguage.bind(this)}>{text}</button>
    }

    return (
        <div>
        {button}
        {this.prepareHtml(this.props.media, this.props.language)}
        </div>
    );
  }


  handleLanguage(){
    let lang = null
    if(this.props.language === "eng"){
      lang = "swa"
    }else{
      lang = "eng"
    }

    this.props.handleLanguage(lang)
  }

  prepareHtml(media, language = "eng") {

    if(language !== "eng"){

     if(media.trans === false){
        return 'Sorry! Cannot translate into language code: ' + language;
      }else{
        return <div dangerouslySetInnerHTML={{ __html: marked(media.trans[language]) }} />;
      }

    }else{

      switch (media.type) {

        case 'html':
          return <div dangerouslySetInnerHTML={{ __html: marked(media.html) }} />;
          break;

          case 'RAW_FROM_URL':
            return <div dangerouslySetInnerHTML={{ __html: marked(media.html) }} />;
            break;

        case 'JSON':
          return this.processJSON(JSON.parse(media.html));
          break;
      }

    }


  }

  processJSON(data) {
    switch (data.type) {

      case 'QUIZ':
        return <QuizComponent quiz={data.id} />;
        break;

      default:
        return 'default';
        break;
    }
  }

}

export default LessonBody;
