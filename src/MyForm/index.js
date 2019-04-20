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
			email: { value: "", isValid: true},
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
		const isEmail = event.target.name === 'email' ? true : false;
		let value = event.target.value;
		let isValid = false;

		if (value.trim() && value.trim() !== '') {
				value = event.target.value.trim();
				isValid = isEmail ? this.isValidEmail(value) : true;
		} else if(isEmail) {
			isValid = true;
		}

		this.setState({
			[event.target.name]: Object.assign({}, this.state[event.target.name], { value: event.target.value, isValid })
		});
	};

	handleOnBlur = (event) => {
		let value = event.target.value;
		let isValid = false;

		if (value.trim()) {
			value = event.target.value.trim();
			if (value !== '') {
				isValid = true;
			}
		} 

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
		let firstName = document.getElementById("first-name-input").value.replace(" ", "");
		let lastName = document.getElementById("last-name-input").value.replace(" ", "");
		let address1 = document.getElementById("address1-input").value.replace(" ", "");
		let address2 = document.getElementById("address2-input").value.replace(" ", "");
		let city = document.getElementById("city-input").value.replace(" ", "");
		let myState = document.getElementById("state-input").value.replace(" ", "");
		let zipCode = document.getElementById("zip-code-input").value.replace(" ", "");

		return (
						state.firstName.value.replace(" ", "") && firstName &&
						state.lastName.value.replace(" ", "") && lastName &&
						state.address1.value.replace(" ", "") && address1 &&
						state.address2.value.replace(" ", "") && address2 &&
						state.city.value.replace(" ", "") && city &&
						state.state.value.replace(" ", "") && myState &&
						state.zipCode.value.replace(" ", "") && zipCode
					 );
	};

	isValidEmail = (email) => {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;		
    return re.test(String(email).toLowerCase());
	}

	handleOnSubmit = () => {
		if (this.inputsAreAllPopulated() && this.state.email.isValid) {
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
			address1,
			address2,
			city,
			state,
			zipCode,
			email,
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
							{formSubmitted && !lastName.isValid && 
								<Message validation={"error"}>Last name is required.</Message>
						  }
						</TextField>
					</div> 
					{/* End of First and Last name */}
					

					{/*  Address line 1 */}
					<TextField>
						<Label>Address line 1</Label>
						<Input
							id="address1-input"
							name="address1"
							value={address1.value}
							onChange={this.handleOnInputChange}
						/>
						{formSubmitted && !address1.isValid && 
							<Message validation={"error"}>Address is required.</Message>
					  }
					</TextField>

					{/*  Address line 2 */}
					<TextField>
						<Label>Address line 2</Label>
						<Input
							id="address2-input"
							name="address2"
							value={address2.value}
							onChange={this.handleOnInputChange}
						/>
						{formSubmitted && !address2.isValid && 
							<Message validation={"error"}>Address is required.</Message>
					  }
					</TextField>


					{/* City, State and Zip */}
					<div id="city-state-zip" className="flex center-all">
						{/* City */}
						<TextField>
							<Label>City</Label>
							<Input
								id="city-input"
								name="city"
								value={city.value}
								onChange={this.handleOnInputChange}
							/>
							{formSubmitted && !city.isValid && 
								<Message validation={"error"}>City is required.</Message>
						  }
						</TextField>

						{/* State */}
						<TextField>
							<Label>State</Label>
							<Input
								id="state-input"
								name="state"
								value={state.value}
								onChange={this.handleOnInputChange}
							/>
							{formSubmitted && !state.isValid && 
								<Message validation={"error"}>State is required.</Message>
						  }
						</TextField>

						{/* Zipcode */}
						<TextField>
							<Label>Zip Code</Label>
							<Input
								id="zip-code-input"
								name="zipCode"
								type="number"
								value={zipCode.value}
								onChange={this.handleOnInputChange}
							/>
							{formSubmitted && !zipCode.isValid && 
								<Message validation={"error"}>Zip Code is required.</Message>
						  }
						</TextField>
					</div>
					{/* End of City, State and Zip */}

					
					{/* Email */}
					<TextField>
						<Label>Email (Optional)</Label>
						<Input
							id="email-input"
							name="email"
							type="text"
							value={email.value}
							onChange={this.handleOnInputChange}
						/>
						{formSubmitted && !email.isValid && 
							<Message validation={"error"}>Please enter a valid email.</Message>
					  }
					</TextField>


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
