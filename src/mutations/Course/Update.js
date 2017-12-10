import Relay from 'react-relay';
import auth from '../../components/App/auth'

export default class Update extends Relay.Mutation {

static fragments = {
userCourse: () => Relay.QL`fragment on UserCourse {id, title, description, verse{reference} }`,
};

getMutation() {
return Relay.QL`mutation CourseUpdate {userCourseUpdate}`;
}

getVariables() {
return {
token: auth.getToken(),
id: this.props.userCourse.id,
description: this.props.userCourse.description,
title: this.props.userCourse.title,
reference: this.props.userCourse.verse.reference,
public: this.props.userCourse.public
};
}

getFatQuery() {
return Relay.QL`fragment on CourseUpdatePayload {error, code, course }`;
}

getConfigs() {
return [{
type: 'FIELDS_CHANGE',
fieldIDs: { course: this.props.userCourse.id }
}];
}

getOptimisticResponse() {

return {
userCourse: {
	id: this.props.userCourse.id,
	title: this.props.userCourse.title,
	description: this.props.userCourse.description,
	verse: this.props.userCourse.verse,
	public: this.props.userCourse.public
}
};
}

}
