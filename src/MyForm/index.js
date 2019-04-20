import React, { Component } from "react";
import * as styles from "./styles.css";

import axios from "axios";
import {
	TextField,
	Label,
	Input,
	Message
} from "@zendeskgarden/react-textfields";
import {
	Checkbox,
	Label as CheckboxLabel
} from "@zendeskgarden/react-checkboxes";
import { Button } from "@zendeskgarden/react-buttons";

class MyForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			viewTitle: "Customer Form",
			apiURL: "https://hooks.zapier.com/hooks/catch/2764166/70rw5z/",
			firstName: { value: "", isValid: false },
			lastName: { value: "", isValid: false },
			address1: { value: "", isValid: false },
			address2: { value: "", isValid: true },
			city: { value: "", isValid: false },
			state: { value: "", isValid: false },
			zipCode: { value: "", isValid: false },
			email: { value: "", isValid: true },
			mailOrEmail: { value: "", isValid: false },
			sendToUSMail: false,
			sendToEMail: false,
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
		const isEmail = event.target.name === "email" ? true : false;
		const isAddress2 = event.target.name === "address2" ? true : false;
		let value = event.target.value;
		let isValid = false;

		if (value.trim() && value.trim() !== "") {
			value = event.target.value.trim();
			isValid = isEmail ? this.isValidEmail(value) : true;
		} else if (isEmail || isAddress2) {
			isValid = true;
		}

		this.setState({
			[event.target.name]: Object.assign({}, this.state[event.target.name], {
				value: event.target.value,
				isValid
			})
		});
	};

	handleOnBlur = event => {
		let value = event.target.value;
		let isValid = false;

		if (value.trim()) {
			value = event.target.value.trim();
			if (value !== "") {
				isValid = true;
			}
		}

		this.setState({
			[event.target.name]: Object.assign({}, this.state[event.target.name], {
				value: this.state[event.target.name].value,
				isValid
			})
		});
	};

	toggleConfirmationModal = isVisible => {
		this.setState({
			confirmIsVisible: isVisible
		});
	};

	handleConfirmChoice = async choice => {
		if (choice === "ok") {
			// axios.post()
			let headers = {
				"Content-type": "application/json",
				"Access-Control-Allow-Origin": "*"
			};
			let body = {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				address1: this.state.address1,
				address2: this.state.address2,
				city: this.state.city,
				state: this.state.state,
				zipCode: this.state.zipCode,
				email: this.state.email,
				sendTo: this.state.sendToUSMail
					? this.state.sendToUSMail
					: this.state.sendToEmail
			};

			// axios resulted in a CORS error
			try {
				var xhr = new XMLHttpRequest();
				xhr.open("POST", this.state.apiURL);
				xhr.send(JSON.stringify({...body}));
				

				// handle successful response
				console.log(`Successful POST request`);
				this.clearForm();
			} catch (error) {
				console.error(`An error occured sending a POST request to ${this.state.apiURL}`, error);
			}
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
		let address1 = document
			.getElementById("address1-input")
			.value.replace(" ", "");
		let city = document.getElementById("city-input").value.replace(" ", "");
		let myState = document.getElementById("state-input").value.replace(" ", "");
		let zipCode = document
			.getElementById("zip-code-input")
			.value.replace(" ", "");

		return (
			state.firstName.value.replace(" ", "") &&
			firstName &&
			state.lastName.value.replace(" ", "") &&
			lastName &&
			state.address1.value.replace(" ", "") &&
			address1 &&
			state.city.value.replace(" ", "") &&
			city &&
			state.state.value.replace(" ", "") &&
			myState &&
			state.zipCode.value.replace(" ", "") &&
			zipCode
		);
	};

	isValidEmail = email => {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	};

	handleOnSubmit = () => {
		if (
			this.inputsAreAllPopulated() &&
			this.state.email.isValid &&
			(this.state.sendToUSMail || this.state.sendToEmail)
		) {
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

	handleOnChecked = event => {
		const isUSMail = event.target.name === "us-mail-checkbox" ? true : false;
		this.setState({
			sendToUSMail: isUSMail ? event.target.value : false,
			sendToEmail: isUSMail ? false : event.target.value
		});
	};

	clearForm = () => {
		this.setState({
			firstName: { value: "", isValid: false },
			lastName: { value: "", isValid: false },
			address1: { value: "", isValid: false },
			address2: { value: "", isValid: true },
			city: { value: "", isValid: false },
			state: { value: "", isValid: false },
			zipCode: { value: "", isValid: false },
			email: { value: "", isValid: true },
			mailOrEmail: { value: "", isValid: false },
			sendToUSMail: false,
			sendToEMail: false,
			confirmIsVisible: false,
			formSubmitted: false
		})
	}

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
			sendToUSMail,
			sendToEmail,
			viewTitle,
			confirmIsVisible,
			formSubmitted
		} = this.state;

		return (
			<div id="MyForm" styles={styles}>
				<div className="view--header">
					<h1>{viewTitle}</h1>
				</div>

				<form action="">
					{/* First and Last Name */}
					<div className="first-and-last flex align-center">
						{/* First Name */}
						<TextField>
							<Label>First Name</Label>
							<Input
								id="first-name-input"
								name="firstName"
								value={firstName.value}
								onChange={this.handleOnInputChange}
							/>
							{formSubmitted && !firstName.isValid && (
								<Message validation={"error"}>First name is required.</Message>
							)}
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
							{formSubmitted && !lastName.isValid && (
								<Message validation={"error"}>Last name is required.</Message>
							)}
						</TextField>
					</div>
					{/* End of First and Last name */}

					{/* Address line 1 */}
					<TextField>
						<Label>Address line 1</Label>
						<Input
							id="address1-input"
							name="address1"
							value={address1.value}
							onChange={this.handleOnInputChange}
						/>
						{formSubmitted && !address1.isValid && (
							<Message validation={"error"}>Address is required.</Message>
						)}
					</TextField>

					{/* Address line 2 */}
					<TextField>
						<Label>Address line 2 (Optional)</Label>
						<Input
							id="address2-input"
							name="address2"
							value={address2.value}
							onChange={this.handleOnInputChange}
						/>
						{formSubmitted && !address2.isValid && (
							<Message validation={"error"}>Address is required.</Message>
						)}
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
							{formSubmitted && !city.isValid && (
								<Message validation={"error"}>City is required.</Message>
							)}
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
							{formSubmitted && !state.isValid && (
								<Message validation={"error"}>State is required.</Message>
							)}
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
							{formSubmitted && !zipCode.isValid && (
								<Message validation={"error"}>Zip Code is required.</Message>
							)}
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
						{formSubmitted && !email.isValid && (
							<Message validation={"error"}>
								Please enter a valid email.
							</Message>
						)}
					</TextField>

					<div id="send-to" className="flex row space-around align-center">
						{/* US Mail or Email checkboxes */}
						<Checkbox
							name="us-mail-checkbox"
							checked={this.state.sendToUSMail}
							onChange={this.handleOnChecked}
						>
							<CheckboxLabel>U.S. Mail</CheckboxLabel>
						</Checkbox>

						<Checkbox
							name="email-checkbox"
							checked={this.state.sendToEmail}
							onChange={this.handleOnChecked}
						>
							<CheckboxLabel>EMail</CheckboxLabel>
						</Checkbox>
						{formSubmitted && (!sendToUSMail && !sendToEmail) && (
							<Message validation={"error"}>Please check your option.</Message>
						)}
					</div>

					<Button id="submit-button" type="button" onClick={this.handleOnSubmit}>
						Submit
					</Button>
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
							<div id="confirm-modal--buttons" className="flex space-around">
								<Button onClick={() => this.handleConfirmChoice("ok")}>
									Ok
								</Button>
								<Button
									primary
									onClick={() => this.handleConfirmChoice("cancel")}
								>
									Cancel
								</Button>
							</div>
							<div id="confirm-modal--agreement">
								<p>By pressing "Ok", I know that this is above & beyond our standard return policy. The customer’s situation warrants it.</p>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default MyForm;
