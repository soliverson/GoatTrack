document.addEventListener('DOMContentLoaded', function() {
    const postsList = document.getElementById('postsList');
    const newPostForm = document.getElementById('newPostForm');
    let posts = [];
    let replyingTo = null;
    let newPost = { author: '', title: '', content: '' };
    let newReply = { author: '', content: '' };
  
    function fetchPosts() {
      fetch('/api/forum/posts')
        .then(response => response.json())
        .then(data => {
          posts = Array.isArray(data) ? data : [];
          renderPosts();
        })
        .catch(error => {
          console.error('Error fetching posts:', error);
          postsList.innerHTML = `<div>Error fetching posts: ${error.message}</div>`;
        });
    }
  
    function handlePostChange(event) {
      newPost[event.target.name] = event.target.value;
    }
  
    function handleReplyChange(event) {
      newReply[event.target.name] = event.target.value;
    }
  
    function handlePostSubmit(event) {
      event.preventDefault();
      fetch('/api/forum/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
      })
        .then(response => response.json())
        .then(data => {
          posts.push(data);
          newPost = { author: '', title: '', content: '' };
          newPostForm.reset();
          renderPosts();
        })
        .catch(error => {
          console.error('Error posting new post:', error);
        });
    }
  
    function handleReplySubmit(event, postId) {
      event.preventDefault();
      fetch(`/api/forum/posts/${postId}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReply)
      })
        .then(response => response.json())
        .then(data => {
          posts = posts.map(post => post._id === postId ? data : post);
          replyingTo = null;
          newReply = { author: '', content: '' };
          renderPosts();
        })
        .catch(error => {
          console.error('Error posting reply:', error);
        });
    }
  
    function renderPosts() {
      postsList.innerHTML = posts.map(post => `
        <li>
          <h2>${post.title}</h2>
          <h3>${post.author}</h3>
          <p>${post.content}</p>
          <button onclick="replyToPost('${post._id}')">Reply</button>
          ${replyingTo === post._id ? `
            <form onsubmit="submitReply(event, '${post._id}')">
              <input type="text" name="author" placeholder="Author" required onchange="updateReply(event)">
              <textarea name="content" placeholder="Reply content" required onchange="updateReply(event)"></textarea>
              <button type="submit">Reply</button>
            </form>
          ` : ''}
          <ul>
            ${(post.replies || []).map(reply => `
              <li>
                <h4>${reply.author}</h4>
                <p>${reply.content}</p>
              </li>
            `).join('')}
          </ul>
        </li>
      `).join('');
    }
  
    window.replyToPost = function(postId) {
      replyingTo = postId;
      renderPosts();
    };
  
    window.updateReply = function(event) {
      newReply[event.target.name] = event.target.value;
    };
  
    window.submitReply = function(event, postId) {
      handleReplySubmit(event, postId);
    };
  
    newPostForm.addEventListener('input', handlePostChange);
    newPostForm.addEventListener('submit', handlePostSubmit);
  
    fetchPosts();
  });
  