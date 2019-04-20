import React, { Component } from 'react';
import * as styles from './styles.css';

class MyForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			viewTitle: 'Customer Form',
			firstName: { value: '', required: true, valid: false },
			lastName: { value: '', required: true, valid: false },
			address1: { value: '', required: true, valid: false },
			address2: { value: '', required: true, valid: false },
			city: { value: '', required: true, valid: false },
			state: { value: '', required: true, valid: false },
			zipCode: { value: '', required: true, valid: false },
			email: { value: '', required: false, valid: false },
			mailOrEmail: { value: '', required: false, valid: false },
			confirmIsVisible: false
		}
	}

	handleOnInputChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	toggleConfirmationModal = (isVisible) => {
		this.setState({
			confirmIsVisible: isVisible
		});
	}

	handleConfirmChoice = (choice) => {
		if (choice === 'ok') {
			// axios.post()
		}

		this.setState({
			confirmIsVisible: false
		});
	}

	render() {
		const { viewTitle, confirmIsVisible } = this.state;

		return (
		  <div id="MyForm" styles={styles}>
				<div id="view--header">
					<h1>{viewTitle}</h1>
				</div>	  	
	
		  	<form action="">
		  		
		  	</form>

			{confirmIsVisible && 
		     <div id="confirm-modal" className="flex column center-all">
				<div id="confirm-modal--content" className="flex column space-around align-center">
					<div id="confirm-modal--header">
						<h1>Are you sure?</h1>
					</div>
					<div id="confirm-modal--buttons">
						<button onClick={() => this.handleConfirmChoice('ok')}>Ok</button>
						<button onClick={() => this.handleConfirmChoice('cancel') }>Cancel</button>
			 		</div>
				</div>
			 </div>
			}
		  </div>
		);
	}
}

export default MyForm;
