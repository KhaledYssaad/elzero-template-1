//components

function addChild(father, ele) {
  let child = document.createElement(ele);
  father.appendChild(child);
  return child;
}

//components

//letest post
let posts = document.querySelector(".posts");

function getTimeAgo(timestamp) {
  const now = new Date();
  const postDate = new Date(timestamp);
  const diffInSeconds = Math.floor((now - postDate) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000)
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
}

// Main function to fetch data and create posts
async function fetchData() {
  try {
    let myData = await fetch("posts.json");
    let result = await myData.json();

    for (let i = 0; i < result.length; i++) {
      const post = result[i];

      // Create main post container
      const postDiv = addChild(posts, "div");
      postDiv.className = "post";
      postDiv.dataset.timestamp = post.postHead.timestamp;

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
      timePosted.textContent = getTimeAgo(post.postHead.timestamp);

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

    // post reacting
    posts.addEventListener("click", function (event) {
      if (event.target.closest(".likes")) {
        const likesDiv = event.target.closest(".likes");
        const heart = likesDiv.querySelector("i");
        const likesCount = likesDiv.querySelector("span");

        if (heart.classList.contains("fa-regular")) {
          heart.classList.replace("fa-regular", "fa-solid");
          heart.style.color = "#f44336";
          likesCount.textContent = parseInt(likesCount.textContent) + 1;
        } else {
          heart.classList.replace("fa-solid", "fa-regular");
          heart.style.color = "#777";
          likesCount.textContent = parseInt(likesCount.textContent) - 1;
        }
      }
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

// Call the main function
fetchData();

// Update times every minute
setInterval(() => {
  document.querySelectorAll(".post").forEach((post) => {
    const timeElement = post.querySelector(".post-head .content p");
    const timestamp = parseInt(post.dataset.timestamp);
    timeElement.textContent = getTimeAgo(timestamp);
  });
}, 60000);

//letest post
