import React, { Component } from 'react';
import update from 'react-addons-update';
import Quiz from './components/Quiz';
import Result from './components/Result';
import BeLogo from '../Svg/BeLogo';
import './Index.css';

class Index extends Component {

  constructor(props) {
    super(props);

    let quizQuestions = JSON.parse(this.props.quiz.questions).questions

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answered:'',
      answer: '',
      passed: false,
      answersCount: {
        a: 0,
        b: 0,
        c: 0,
        d: 0
      },
      result: '',
      quizQuestions: quizQuestions
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentWillMount() {
    let quizQuestions = this.state.quizQuestions
    const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));
    console.log(shuffledAnswerOptions)
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);

    if (this.state.questionId < this.state.quizQuestions.length) {
        setTimeout(() => this.setNextQuestion(), 300);
    } else {
        setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  setUserAnswer(answer) {
    const updatedAnswersCount = update(this.state.answersCount, {
      [answer]: {$apply: (currentValue) => currentValue + 1}
    });

    let answered = this.state.answered + answer

    this.setState({
        answersCount: updatedAnswersCount,
        answer: answer,
        answered: answered
    });
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
    let quizQuestions = this.state.quizQuestions

    this.setState({
        counter: counter,
        questionId: questionId,
        question: quizQuestions[counter].question,
        answerOptions: quizQuestions[counter].answers,
        answer: ''
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
  }

  setResults(result) {

    let n = this.state

    if (result.length === 1) {
      n.result = result[0]
    } else {
      n.result = 'Undetermined'
    }

    if(n.answered === this.props.quiz.solution){
      n.passed = true
    }

//temp override
n.passed = true
    this.setState(n);
  }

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={this.state.quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return (
      <Result quizResult={this.state.result} passed={this.state.passed} nextLessonUrl={this.props.nextLessonUrl}/>
    );
  }

  render() {
    return (
      <div id="quizzer">
        <div className="quiz-head">

          <BeLogo styleName="quiz-logo"/>

          <h2>Quiz</h2>
        </div>
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }

}

export default Index;
