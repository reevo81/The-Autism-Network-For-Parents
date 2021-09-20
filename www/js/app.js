const postList = document.querySelector('#postTable');
const postForm = document.querySelector('#postCreate');

// create elements and render to DOM post table element
function renderPosts(doc) {

    const table = document.getElementById("renderBody");
      let row = table.insertRow();
	  row.id = doc.id;
	  row.name = "";
	  console.log('Doc ID is... ' + row.id)
      let name = row.insertCell(0);
      name.innerHTML = doc.data().postName;
      let desc = row.insertCell(1);
      desc.innerHTML = doc.data().postDesc;
      let author = row.insertCell(2);
      author.innerHTML = doc.data().userName;
// Test to put replies array into 4th column and match to each post 
//      let reply = row.insertCell(3);
//      reply.innerHTML = doc.data().replies;
// Function to get replies into new rows beneath each post. Not currently working!! 	
//		var replies = db.collection("posts/" + row.id + "/replies");
//		replies.get().then((querySnapshot) => {
//				querySnapshot.forEach((doc) => {
//				let row = table.insertRow();
//				let name = row.insertCell(0);
//				name.innerHTML = doc.data().reply;
//				console.log(doc.id, ' => ', doc.data());
//				console.log(doc.data().reply);
//			});
//		});

}

// This function does not work. Possibly because no tr tag has been created in the HTML table!!!  
//$(document).ready(function(){
//    $("tableSelector").delegate("td", "click", function(){
//        alert("Click!");
//    });
//});

// get updates in real-time
db.collection('posts').onSnapshot(snapshot => {
	let changes = snapshot.docChanges();
	changes.forEach(change => {
		if(change.type == 'added'){
			renderPosts(change.doc);
			console.log(change.doc.id, " => ", change.doc.data());
		
		}
//		var replies = db.collection("posts/" + change.doc.id + "/replies");
//		replies.get().then((querySnapshot) => {
//				querySnapshot.forEach((doc) => {
//				console.log(doc.id, ' => ', doc.data());
//				console.log(doc.data().reply);
//			});
//		});
	})
})
		
// Add Event Listener to create post button
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
