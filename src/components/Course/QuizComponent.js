import React from 'react'

class MultipleChoice extends React.Component {

  render() {
    let a = this.props.activity;

    return (<div>
        <p>{a.body}</p>
        {a.options.map(function (o, key) {
          return <label key={key}><input type='radio' name={a.id} value={o.display} />{o.display}<br /></label>;
        })}</div>
    );
  }
}

class FillInTheBlank extends React.Component {

  componentWillMount() {
    let sentence = this.props.activity.body;
    let answers = [];
    let blank = '%%%%%%%%';

    let x = this.props.activity.options.map(function (o, k) {
      sentence = sentence.replace(o, blank);
      answers[k] = { user: '', real: o };
    });

    sentence = sentence.split(' ');

    this.state = {
      blank,
      sentence,
      options: this.props.activity.options,
      answers
    };
  }

  render() {
    let answers = this.state.answers;
    let blank = this.state.blank;
    let z = '';
    let updateAnswer = this.updateAnswer;
    let blankCtr = 0;
    let that = this;
    let score = 0;
    let scoreIs = '';

    this.state.answers.map(function (a) {
      if (a.real.toLowerCase() === a.user.toLowerCase()) {
        score = score + 1;
      }
    });

    if (score >= answers.length) {
      scoreIs = 'correct';
    } else {
      scoreIs = 'incorrect';
    }

    return (
        <p>{scoreIs} {this.state.sentence.map(function (word, k) {
          if (word === blank) {
            z = <input onChange={updateAnswer.bind(that)} data-id={blankCtr} type='text' value={answers[blankCtr].user} />;
            blankCtr = blankCtr + 1;
          } else {
            z = word;
          }

          return <span key={k} style={{ paddingLeft: '10px' }}>{z}</span>;
        })}</p>
    );
  }

  updateAnswer(e) {
    let s = this.state;
    s.answers[e.target.dataset.id].user = e.target.value;
    this.setState(s);
  }
}


class Activity extends React.Component {
  render() {
    return (
        <div key={this.props.activity.id} style={{ borderBottom: 'solid 1px black' }}>
          <h2># {this.props.activity.id} </h2>
          {this.prepareActivity(this.props.activity)}

        </div>
    );
  }

  prepareActivity(activity) {
    switch (activity.type) {

      case 'MULTIPLE_CHOICE':
        return <MultipleChoice activity={activity} />;
        break;

      case 'FILL_IN_THE_BLANK':
        return <FillInTheBlank activity={activity} />;
        break;
    }
  }

}

class QuizComponent extends React.Component {
  render() {
    let prepareActivity = this.prepareActivity;

    return (
        <div>
          <h1>{this.props.quiz.title}</h1>
          <p>{this.props.quiz.instructions}</p>

          {this.props.quiz.questions.map(function (q) {
            return <Activity key={q.id} activity={q} />;
          })}

        </div>
    );
  }

}

export default QuizComponent;
