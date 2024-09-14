let profilepics = document.querySelectorAll(".profile-pic"),
  inputFile = document.querySelector("#fileImage");

// Check if there's an image saved in local storage
if (localStorage.getItem("profileImage")) {
  profilepics.forEach((profilepic) => {
    profilepic.src = localStorage.getItem("profileImage"); // Load from local storage
  });
}

inputFile.onchange = function () {
  let file = inputFile.files[0];
  let reader = new FileReader();

  // When the file is read, update the image src and save it to local storage
  reader.onload = function () {
    profilepics.forEach((profilepic) => {
      profilepic.src = reader.result; // Display image
    });
    localStorage.setItem("profileImage", reader.result);
    // Save to local storage
  };

  if (file) {
    reader.readAsDataURL(file);
  }
};
