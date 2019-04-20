import React, { Component } from "react";
import * as styles from "./styles.css";

import {
	TextField,
	Label,
	Input,
	Message
} from "@zendeskgarden/react-textfields";

class MyForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			viewTitle: "Customer Form",
			firstName: { value: "", isValid: false},
			lastName: { value: "", isValid: false},
			address1: { value: "", isValid: false},
			address2: { value: "", isValid: false},
			city: { value: "", isValid: false},
			state: { value: "", isValid: false},
			zipCode: { value: "", isValid: false},
			email: { value: "", isValid: false},
			mailOrEmail: { value: "", isValid: false},
			confirmIsVisible: false,
			formSubmitted: false
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (!prevState.formSubmitted && this.state.formSubmitted) {
			this.setState({ formSubmitted: true });
		}
	}

	handleOnInputChange = event => {
		let value = event.target.value;
		let isValid = false;

		// If there are characters
		if (value.trim()) {
			value = event.target.value.trim();
			// Characters were entered
			if (value !== '') {
				isValid = true;
			}

			// Otherwise just spaces were entered
		} 
    // Else it's an empty string

		this.setState({
			[event.target.name]: Object.assign({}, this.state[event.target.name], { value: event.target.value, isValid })
		});
	};

	handleOnBlur(event) {
		let value = event.target.value;
		let isValid = false;

		// If there are characters
		if (value.trim()) {
			value = event.target.value.trim();
			// Characters were entered
			if (value !== '') {
				isValid = true;
			}

			// Otherwise just spaces were entered
		} 
    // Else it's an empty string

		this.setState({
			[event.target.name]: Object.assign({}, this.state[event.target.name], { value: this.state[event.target.name].value, isValid })
		});
	}

	toggleConfirmationModal = isVisible => {
		this.setState({
			confirmIsVisible: isVisible
		});
	};

	handleConfirmChoice = choice => {
		if (choice === "ok") {
			// axios.post()
		}

		this.setState({
			confirmIsVisible: false
		});
	};

	inputsAreAllPopulated = () => {
		console.log(`inputsAreAllPopulated()`);
		let state = this.state;
		let firstName = document
			.getElementById("first-name-input") 
			.value.replace(" ", "");

		let lastName = document
			.getElementById("last-name-input")
			.value.replace(" ", "");

		return (
						state.firstName.value.replace(" ", "") && firstName &&
						state.lastName.value.replace(" ", "") && lastName
					 );
	};

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
	};

	render() {
		const {
			firstName,
			lastName,
			viewTitle,
			confirmIsVisible,
			formSubmitted
		} = this.state;

		return (
			<div id="MyForm" styles={styles}>
				<div id="view--header">
					<h1>{viewTitle}</h1>
				</div>

				<form action="">
					{/* First and Last Name */}
					<div className="first-and-last flex space-around align-center">
						{/* First Name */}
						<TextField>
							<Label>First Name</Label>
							<Input
								id="first-name-input"
								name="firstName"
								value={firstName.value}
								onChange={this.handleOnInputChange}
							/>
							{formSubmitted && !firstName.isValid &&
								<Message validation={"error"}>First name is required.</Message>
							}
						</TextField>

						{/* Last Name */}
						<TextField>
							<Label>Last Name</Label>
							<Input
								id="last-name-input"
								name="lastName"
								value={lastName.value}
								onChange={this.handleOnInputChange}
							/>
							{formSubmitted && !this.state.lastName.isValid && 
								<Message validation={"error"}>Last name is required.</Message>
						  }
						</TextField>
					</div>

					<button type="button" onClick={this.handleOnSubmit}>
						Submit
					</button>
				</form>

				{confirmIsVisible && (
					<div id="confirm-modal" className="flex column center-all">
						<div
							id="confirm-modal--content"
							className="flex column space-around align-center"
						>
							<div id="confirm-modal--header">
								<h1>Are you sure?</h1>
							</div>
							<div id="confirm-modal--buttons">
								<button onClick={() => this.handleConfirmChoice("ok")}>
									Ok
								</button>
								<button onClick={() => this.handleConfirmChoice("cancel")}>
									Cancel
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default MyForm;
