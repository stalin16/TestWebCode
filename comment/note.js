
const submitBtn = document.querySelector(".submit__btn");
const userName = document.querySelector("#user");
const comment = document.querySelector("#comment");
const likeIcon = document.querySelector(".heart__icon");
const count = document.querySelector(".count");
const commentsCont = document.querySelector(".comments__container");

likeIcon.addEventListener("click", likeVideo);
submitBtn.addEventListener("click", submitFeedback);

let feedbackArr = [];
let positiveFeedback = false;

function submitFeedback(e) {
  e.preventDefault();

  // get user name
  const userForm = userName.value;
  // get feedback
  const commentForm = comment.value;
  // if inputs are not empty
  if (userForm !== "" && commentForm !== "") {
    // create new feedback
    const newFeedback = {
      id: Math.floor(Math.random() * 1000 + 1),
      userName: userForm,
      userComment: commentForm,
      typeOfFeedback: positiveFeedback,
    };
    // add new feedback to array
    feedbackArr.push(newFeedback);
    // if liked add to count
    if (positiveFeedback === true) {
      addLikes();
    }
    // clear inputs
    resetForm();
    // add feedback to list
    addFeedback(newFeedback);
  }
}

function likeVideo() {
  likeIcon.classList.toggle("liked");

  if (likeIcon.classList.contains("liked")) {
    likeIcon.innerHTML = `<i class="fas fa-heart"></i>`;
    // set feedback to liked
    positiveFeedback = true;
  } else {
    likeIcon.innerHTML = `<i class="far fa-heart"></i>`;
    // set feedback to not liked
    positiveFeedback = false;
  }
}

function resetForm() {
  userName.value = "";
  comment.value = "";
  likeIcon.innerHTML = `<i class="far fa-heart"></i>`;
  positiveFeedback = false;
}

function addFeedback(item) {
  // select first letter of the user name
  const letter = item.userName.charAt(0);
  // create new div
  const div = document.createElement("div");
  // add class
  div.classList = "comment__card";
  // add id
  div.id = item.id;
  // add html
  div.innerHTML = `
    <div class="pic center__display">
      ${letter}
    </div>
    <div class="comment__info">
      <p class="comment">
        ${item.userComment}
      </p>
    </div>
  `;
  // insert feedback into the list
  commentsCont.insertAdjacentElement("beforeend", div);
}
