const submitBtn = document.querySelector(".submit__btn");
const comment = document.querySelector("#comment");
const likeIcon = document.querySelector(".heart__icon");
const commentsCont = document.querySelector(".comments__container");

likeIcon.addEventListener("click", likeVideo);
submitBtn.addEventListener("click", submitFeedback);

let feedbackArr = [];
let positiveFeedback = false;

// Fetch user data from JSON
fetch("users.json")
  .then((response) => response.json())
  .then((data) => {
    const users = data.users;
    // Use the users data here
    console.log(users);
  })
  .catch((error) => {
    console.log("Error fetching user data:", error);
  });

function submitFeedback(e) {
  e.preventDefault();

  // get feedback
  const commentForm = comment.value;
  // if input is not empty
  if (commentForm !== "") {
    // create new feedback
    const newFeedback = {
      id: Math.floor(Math.random() * 1000 + 1),
      userComment: commentForm,
      typeOfFeedback: positiveFeedback,
      photo: "https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg", // Replace with the actual photo path
      username: "John_Doe", // Replace with the actual username
    };
    // add new feedback to array
    feedbackArr.push(newFeedback);
    // if liked add to count
    if (positiveFeedback === true) {
      addLikes();
    }
    // clear input
    resetForm();
    // add feedback to list
    addFeedback(newFeedback);
  }
}

function likeVideo() {
  likeIcon.classList.toggle("liked");

  if (likeIcon.classList.contains("liked")) {
    likeIcon.innerHTML = ``;
    // set feedback to liked
    positiveFeedback = true;
  } else {
    likeIcon.innerHTML = ``;
    // set feedback to not liked
    positiveFeedback = false;
  }
}

function resetForm() {
  comment.value = "";
  positiveFeedback = false;
}

function addFeedback(item) {
  // create new div
  const div = document.createElement("div");
  // add class
  div.classList = "comment__card";
  // add id
  div.id = item.id;
  // add html
  div.innerHTML = `
    <div class="comment__info">
        <img src="${item.photo}" alt="">
        <div class="des">
            <small class="nickname">
                ${item.username}
            </small>
            <p class="comment">
                ${item.userComment}
            </p>
        </div>
    </div>
  `;
  // insert feedback into the list
  commentsCont.insertAdjacentElement("beforeend", div);
}