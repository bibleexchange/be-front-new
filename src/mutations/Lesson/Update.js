import Relay from 'react-relay';
import auth from '../../components/App/auth'

export default class Update extends Relay.Mutation {

static fragments = {
userLesson: () => Relay.QL`fragment on UserLesson {id, title, description, body{id,text} }`,
};

getMutation() {
return Relay.QL`mutation LessonUpdate {userLessonUpdate}`;
}

getVariables() {
return {
token: auth.getToken(),
id: this.props.userLesson.id,
description: this.props.userLesson.description,
title: this.props.userLesson.title,
body: this.props.userLesson.body.text
};
}

getFatQuery() {
return Relay.QL`fragment on LessonUpdatePayload {error, code, lesson {id, title, description, body{id,text} }}`;
}

getConfigs() {
	return [{
	type: 'FIELDS_CHANGE',
	fieldIDs: { lesson: this.props.userLesson.id }
	}];
}

getOptimisticResponse() {

return {
userLesson: {
	id: this.props.userLesson.id,
	title: this.props.userLesson.title,
	description: this.props.userLesson.description,
	body: this.props.userLesson.body
}
};
}

}
