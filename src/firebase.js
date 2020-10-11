import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: 'AIzaSyB1UWY7ncqPMgcfLon_0zXeeiPoVcZgBtY',
	authDomain: 'fb-web-exam.firebaseapp.com',
	databaseURL: 'https://fb-web-exam.firebaseio.com',
	projectId: 'fb-web-exam',
	storageBucket: 'fb-web-exam.appspot.com',
	messagingSenderId: '1066039683081',
	appId: '1:1066039683081:web:af046d94ab89c181bcf0d8',
};

// Initialize Firebase
class Firebase {
	constructor() {
		firebase.initializeApp(firebaseConfig);
		this.auth = firebase.auth();
		this.db = firebase.firestore();
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password);
	}

	logout() {
		return this.auth.signOut();
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password);
		return this.auth.currentUser.updateProfile({
			displayName: name,
		});
	}

	async createContact(FName, LName, Email, Mobile) {
		var object = {
			FirstName: FName,
			LastName: LName,
			email: Email,
			Mobile: Mobile,
		};
		await this.db.collection('contacto').doc().set(object);
		alert('Create Contact');
	}

	async getContact() {
		var data = [],
			temp = {};
		await this.db
			.collection('contacto')
			.get()
			.then(function (query) {
				query.forEach(function (doc) {
					temp = {
						id: doc.id,
						FirstName: doc.data().FirstName,
						LastName: doc.data().LastName,
						email: doc.data().email,
						Mobile: doc.data().Mobile,
					};
					data.push(temp);
				});
			});

		return data;
	}

	async getContactById(id) {
		var data = {};
		await this.db
			.collection('contacto')
			.doc(id)
			.get()
			.then(function (doc) {
				data = {
					id: doc.id,
					FirstName: doc.data().FirstName,
					LastName: doc.data().LastName,
					email: doc.data().email,
					Mobile: doc.data().Mobile,
				};
			});
		return data;
	}

	async deleteContact(id) {
		await this.db.collection('contacto').doc(id).delete();
		alert('Contact Deleted');
	}

	async updateContact(id, contact) {
		var updateData = {
			FirstName: contact.FName,
			LastName: contact.LName,
			email: contact.Email,
			Mobile: contact.Mobile,
		};
		await this.db.collection('contacto').doc(id).update(updateData);
		alert('Contact Updated');
	}
}

export default new Firebase();
