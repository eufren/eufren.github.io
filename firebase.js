// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyA-2WTjCS28cp-15NZpcu6lZIG90q0g8I0",
	authDomain: "openadhd-8e9a5.firebaseapp.com",
	databaseURL: "https://openadhd-8e9a5.firebaseio.com",
	projectId: "openadhd-8e9a5",
	storageBucket: "openadhd-8e9a5.appspot.com",
	messagingSenderId: "926041459628",
	appId: "1:926041459628:web:7d605c135a78e540dd8809"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log("initialised firebase");

function saveToFirebase(number) {
	console.log("click");
	firebase.database().ref('numbers').push().set(number)
		.then(function(snapshot) {
			console.log("sent " + number);
		}, function(error) {
			console.log('error' + error);
		});
}