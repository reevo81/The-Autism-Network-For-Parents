const postList = document.querySelector('#postTable');
// create elements and render to DOM
function renderPosts(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let desc = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().postName;
    desc.textContent = doc.data().postDesc;
    
    li.appendChild(name);
    li.appendChild(desc);
    
    postList.appendChild(li);
}

db.collection('posts').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderPosts(doc);
    })  
})
