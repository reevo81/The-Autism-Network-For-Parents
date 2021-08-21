const postList = document.querySelector('#postTable');
const postForm = document.querySelector('#postCreate');

// create elements and render to DOM
function renderPosts(doc) {

    const table = document.getElementById("testBody");
      let row = table.insertRow();
      let name = row.insertCell(0);
      name.innerHTML = doc.data().postName;
      let desc = row.insertCell(1);
      desc.innerHTML = doc.data().postDesc;
      let author = row.insertCell(2);
      author.innerHTML = doc.data().userName;
}

/*
db.collection('posts').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderPosts(doc);
		console.log(doc.id, " => ", doc.data());
			var replies = db.collectionGroup('replies');
				replies.get().then((querySnapshot) => {
				querySnapshot.forEach((rep) => {
				console.log(rep.id, ' => ', rep.data());
			});
		});
    });  
});
*/

// get updates in real-time
db.collection('posts').onSnapshot(snapshot => {
	let changes = snapshot.docChanges();
	changes.forEach(change => {
		var replies = db.collectionGroup('replies');
		replies.get().then((querySnapshot) => {
		querySnapshot.forEach((rep) => {
		console.log(rep.id, ' => ', rep.data());
		})
			if(change.type == 'added'){
				renderPosts(change.doc);
				console.log(change.doc.id, " => ", change.doc.data());
			}
		})
	})
})

postForm.addEventListener('submit', (post) => {
	post.preventDefault();
	db.collection("posts").add({
		postName: postForm.postTitle.value,
		postDesc: postForm.postContent.value,
		profilePic: "Unknown",
		userName: "Unknown"
	})
	postForm.postTitle.value = '';
	postForm.postContent.value = '';
	$("#collapseNewPost").collapse({ 'toggle': false }).collapse('hide');
})
