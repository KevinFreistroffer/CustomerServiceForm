import React, { Component } from 'react';
import * as styles from './styles.css';

import { TextField, Label, Input, Message } from '@zendeskgarden/react-textfields';

class MyForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			viewTitle: 'Customer Form',
			firstName: '',
			lastName: '',
			address1: '',
			address2: '',
			city: '',
			state: '',
			zipCode: '',
			email: '',
			mailOrEmail: '',
			confirmIsVisible: false,
			firstNameIsDirty: false,
		}
	}

	// componentDidUpdate(prevProps, prevState) {
	// 	const { firstName, firstNameIsDirty } = this.state;
	// 	if (prevState.firstName === '' && prevState.firstNameIsDirty && firstName !== '' && firstNameIsDirty) {
	// 		this.setState({ firstNameIsDirty });
	// 	}
	// }

	handleOnInputChange = (event) => {
		console.log(event.target.name);
		console.log(event.target.value);


		this.setState({
			[event.target.name]: event.target.value,
			formSubmitted: false
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

	inputsAreAllPopulated = () => {
    console.log(`inputsAreAllPopulated()`);
    let state = this.state;
    let username = document.getElementById('first-name-input').value.replace(" ", "");

    return (
             state.firstName.replace(" ", "") && username
           );
  }

	handleOnSubmit = () => {
		if (this.inputsAreAllPopulated()) {
			this.setState({
				formSubmitted: true,
				confirmIsVisible: true
			});
		} else {
			this.setState({
				formSubmitted: true
			});
		}
	}


	render() {
		const { firstName, viewTitle, confirmIsVisible, formSubmitted } = this.state;

		return (
		  <div id="MyForm" styles={styles}>
				<div id="view--header">
					<h1>{viewTitle}</h1>
				</div>	  	
	
		  	<form action="">
					<TextField>
						<Label>First Name</Label>
						<Input id="first-name-input" name="firstName" value={firstName} onChange={this.handleOnInputChange} />
						{formSubmitted && this.state.firstName === '' && 	
						 <Message validation={'error'}>
						 	First name is required.
						 </Message>
						}
					</TextField>




					<button type="button" onClick={this.handleOnSubmit}>Submit</button>
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
