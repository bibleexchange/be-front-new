import Relay from 'react-relay';
import Widget from './WidgetComponent';

export default Relay.createContainer(Widget, {
  fragments: {
    course: () =>  Relay.QL`
      fragment on Course {
		  id
		  title
		  url
		  description
		  modules(first:100){
			edges {
			  node {
				id
				title
				orderBy
				chapters (first:100){
				  edges {
					node {
					  id
					  title
					  orderBy
					  steps(first:100){
						edges {
						  node {
							id
							body
                type
						  }
						}
					  }
					}
				  }
				}
			  }
			}
		  }
	}`
  }
});
