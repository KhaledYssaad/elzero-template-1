function addChild(father, ele) {
  let child = document.createElement(ele);
  father.appendChild(child);
  return child;
}

let posts = document.querySelector(".posts");

async function fetchData() {
  try {
    let myData = await fetch("posts.json");
    let result = await myData.json();

    for (let i = 0; i < result.length; i++) {
      const post = result[i];

      // Create main post container
      const postDiv = addChild(posts, "div");
      postDiv.className = "post";

      // Create post head
      const postHead = addChild(postDiv, "div");
      postHead.className = "post-head";

      const avatar = addChild(postHead, "img");
      avatar.src = post.postHead.avatar;
      avatar.alt = "";
      avatar.classList.add("profile-pic");

      const content = addChild(postHead, "div");
      content.className = "content";

      const authorName = addChild(content, "h5");
      authorName.textContent = post.postHead.author;

      const timePosted = addChild(content, "p");
      timePosted.textContent = post.postHead.time;

      // Create post body
      const postBody = addChild(postDiv, "p");
      postBody.className = "post-body";
      postBody.textContent = post.postBody;

      // Create post foot
      const postFoot = addChild(postDiv, "div");
      postFoot.className = "post-foot";

      const likes = addChild(postFoot, "div");
      likes.className = "likes";

      const heartIcon = addChild(likes, "i");
      heartIcon.className = "fa-regular fa-heart";

      const likesCount = addChild(likes, "span");
      likesCount.textContent = post.postFoot.likes;

      const comments = addChild(postFoot, "div");
      comments.className = "comments";

      const commentIcon = addChild(comments, "i");
      commentIcon.className = "fa-regular fa-comment";

      const commentsText = document.createTextNode(
        ` ${(post.postFoot.comments / 1000).toFixed(1)}k`
      );
      comments.appendChild(commentsText);
    }
  } catch (error) {
    throw error(`reason: ${error}`);
  }
}

fetchData();
