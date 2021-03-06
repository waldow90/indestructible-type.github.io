var config = {
	apiKey: "AIzaSyC2oMkn2Z9Zt5B2LH9Dav01HvhbDY3Ii8k",
	authDomain: "indestructibletype-hitcount.firebaseapp.com",
	databaseURL: "https://indestructibletype-hitcount.firebaseio.com",
	projectId: "indestructibletype-hitcount",
	storageBucket: "indestructibletype-hitcount.appspot.com",
	messagingSenderId: "94225162584"
};
firebase.initializeApp(config);
	const rootRef = firebase.database().ref();
	const moneyCountRef = rootRef.child("moneyCount");
	let getHistory = new Promise(function (resolve, reject){
		let obj = {};
		moneyCountRef.orderByChild("page").equalTo("/BuyBodoni.html").once("value", function (snapshot){
			snapshot.forEach(function (child){
				obj = {
					key: child.key,
					count: child.val().dollars,
					referrer: child.val().lastreferrer,
					dollarq: child.val().dollarq
				}
			})
			if (obj) {
				resolve(obj);
			} else {
				reject(error);
			}
		})
	});

	getHistory.then(function(fromResolve){
		var key = fromResolve.key;
		var pastcounts = fromResolve.count;
		var referrer = fromResolve.referrer;
		var dollarq = fromResolve.dollarq;
		if (key == undefined){
			key = moneyCountRef.push().key;
			pastcounts = 0;
		}
		refstot = document.referrer + " " + referrer;
		counts = pastcounts + dollarq;
		var postData = {
			page: "/BuyBodoni.html",
			dollars: dollarq,
			lastvisit: firebase.database.ServerValue.TIMESTAMP,
			inputamount: 0
		}
		var updates = {};
		updates["/moneyCount/" + key] = postData;
		rootRef.update(updates);
	}).catch(function (fromReject) {
		console.log(error);
	})
