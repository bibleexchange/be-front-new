import React from 'react'

import './Modal.scss';

export default class ModalComponent extends React.Component {

  render() {
	const modalStyle = {}

	if(!this.props.shouldDisplay){
	 modalStyle.display = 'none';
	}

    return (<div id="modal" style={modalStyle} >
		  <div id="dialog" >

			<button onClick={this.props.close}>
			  <span>&times;</span>
			</button>

        {this.props.component}

		    </div>
		</div>)
  }

}
