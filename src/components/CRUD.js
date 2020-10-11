import React, { Component } from 'react';
import '../styles/CRUD.css';
import { Redirect } from 'react-router-dom';
import firebase from '../firebase';
import {
	Input,
	FormGroup,
	Label,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
} from 'reactstrap';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contacto: [],
			contact: {
				id: '',
				FName: '',
				LName: '',
				Email: '',
				Mobile: '',
			},
			open: false,
			Count: 1,
			redirect: false,
		};
	}

	componentDidMount() {
		this.getContact();
	}

	refresh = () => {
		this.setState({
			contacto: [],
			contact: {
				id: '',
				FName: '',
				LName: '',
				Email: '',
				Mobile: '',
			},
			open: false,
			Count: 1,
		});

		this.getContact();
	};

	openModal = () => {
		let { contact } = this.state;
		if (this.state.open) {
			contact = {
				id: '',
				FName: '',
				LName: '',
				Email: '',
				Mobile: '',
			};
		}
		this.setState({ open: !this.state.open, contact });
	};

	getContact = async () => {
		let { contacto } = this.state;
		contacto = await firebase.getContact();
		this.setState({ contacto });
	};

	createOrEditContact = async (e) => {
		try {
			e.preventDefault();

			if (this.state.contact.id === '') {
				await firebase.createContact(
					this.state.contact.FName,
					this.state.contact.LName,
					this.state.contact.Email,
					this.state.contact.Mobile
				);
			} else {
				await firebase.updateContact(this.state.contact.id, this.state.contact);
			}

			this.refresh();
		} catch (error) {
			alert(error.message);
		}
	};

	async sureDeleteContact(id) {
		await firebase.deleteContact(id);

		this.refresh();
	}

	async deleteContact(id) {
		let { contact } = this.state;
		const res = await firebase.getContactById(id);
		contact = {
			id: res.id,
			FName: res.FirstName,
			LName: res.LastName,
			Email: res.email,
			Mobile: res.Mobile,
		};
		this.setState({ contact });
		console.log(this.state.contact);
		this.openModal();
	}

	async updateContact(id) {
		let { contact } = this.state;
		const res = await firebase.getContactById(id);
		contact = {
			id: res.id,
			FName: res.FirstName,
			LName: res.LastName,
			Email: res.email,
			Mobile: res.Mobile,
		};
		this.setState({ contact });
		console.log(this.state.contact);
		this.openModal();
	}

	logout = () => {
		firebase.logout();
		this.setState({ redirect: true });
	};

	render() {
		if (this.state.redirect) {
			return <Redirect to={'/'} />;
		}

		return (
			<div className='container p-4'>
				<div className='d-flex justify-content-end'>
					<Button className='mr-2' color='success' onClick={this.openModal}>
						Add New Record
					</Button>
					<Button color='secondary' onClick={this.logout}>
						LogOut
					</Button>
				</div>
				<h1 className='text-left'>
					<b>My Contacts</b>
				</h1>
				<table className='table table-bordered'>
					<thead>
						<tr>
							<th scope='col'>No.</th>
							<th scope='col'>First Name</th>
							<th scope='col'>Last Name</th>
							<th scope='col'>Email Address</th>
							<th scope='col'>Update</th>
							<th scope='col'>Delete</th>
						</tr>
					</thead>
					<tbody>
						{this.state.contacto.map((c) => (
							<tr key={c.id}>
								<th scope='row'>{this.state.Count++}</th>
								<td>{c.FirstName}</td>
								<td>{c.LastName}</td>
								<td>{c.email}</td>
								<td>
									<input
										type='submit'
										className='btn btn-warning text-white'
										value='Update'
										onClick={this.updateContact.bind(this, c.id)}
									/>
								</td>
								<td>
									<input
										type='submit'
										className='btn btn-danger'
										value='Delete'
										onClick={this.deleteContact.bind(this, c.id)}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<Modal isOpen={this.state.open}>
					<ModalHeader className='bg-primary text-white'>
						Contact Form
					</ModalHeader>
					<ModalBody>
						<FormGroup>
							<Label for='FName'>First Name</Label>
							<Input
								type='text'
								id='FName'
								value={this.state.contact.FName}
								onChange={(e) => {
									let { contact } = this.state;
									contact.FName = e.target.value;
									this.setState({ contact });
								}}
							/>
						</FormGroup>
						<FormGroup>
							<Label for='LName'>Last Name</Label>
							<Input
								type='text'
								id='LName'
								value={this.state.contact.LName}
								onChange={(e) => {
									let { contact } = this.state;
									contact.LName = e.target.value;
									this.setState({ contact });
								}}
							/>
						</FormGroup>
						<FormGroup>
							<Label for='Email'>Email</Label>
							<Input
								type='email'
								id='Email'
								value={this.state.contact.Email}
								onChange={(e) => {
									let { contact } = this.state;
									contact.Email = e.target.value;
									this.setState({ contact });
								}}
							/>
						</FormGroup>
						<FormGroup>
							<Label for='Mobile'>mobile #</Label>
							<Input
								type='text'
								id='Mobile'
								value={this.state.contact.Mobile}
								onChange={(e) => {
									let { contact } = this.state;
									contact.Mobile = e.target.value;
									this.setState({ contact });
								}}
							/>
						</FormGroup>
					</ModalBody>
					<ModalFooter>
						<Button
							className='text-white'
							color='warning'
							onClick={this.openModal}
						>
							Cancel
						</Button>
						<Button color='primary' onClick={this.createOrEditContact}>
							Save
						</Button>
						<Button
							color='danger'
							onClick={this.sureDeleteContact.bind(this, this.state.contact.id)}
						>
							Delete
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}
