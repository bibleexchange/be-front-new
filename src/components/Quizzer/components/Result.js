import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';

function Result(props) {

  let ifPassed = <p>Sorry You didn't pass. You may need to review the material and test again.</p>

  if(props.passed){
    ifPassed = <Link to={props.nextLessonUrl}>Go to Next Lesson</Link>
  }

  return (
    <ReactCSSTransitionGroup
      className="container result"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div>
        You prefer <strong>{props.quizResult}</strong>!

        {ifPassed}
      </div>
    </ReactCSSTransitionGroup>
  );

}

Result.propTypes = {
  quizResult: React.PropTypes.string.isRequired,
};

export default Result;
