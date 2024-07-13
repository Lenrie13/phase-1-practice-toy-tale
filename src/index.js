let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// Fetch all toys on page load
fetchToys();

addBtn.addEventListener("click", () => {
  addToy = !addToy;
  toyFormContainer.style.display = addToy ? "block" : "none";
});

toyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const toyName = event.target.name.value;
  const toyImage = event.target.image.value;

  // Create new toy
  createToy(toyName, toyImage);
});
});

// Fetch toys from the server
function fetchToys() {
fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => {
    toys.forEach(toy => renderToy(toy));
  });
}

// Fetch all toys on page load
fetchToys();

addBtn.addEventListener("click", () => {
  addToy = !addToy;
  toyFormContainer.style.display = addToy ? "block" : "none";
});

toyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const toyName = event.target.name.value;
  const toyImage = event.target.image.value;

  // Create new toy
  createToy(toyName, toyImage);
});


// Fetching toys from the server
function fetchToys() {
fetch("http://localhost:3000/toys")
  .then(response => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  })
  .then(toys => {
    toys.forEach(toy => renderToy(toy));
  })
  .catch(error => console.error("There was a problem with the fetch operation:", error));
}

// Rendering each toy
function renderToy(toy) {
const toyCollection = document.querySelector("#toy-collection");
const toyCard = document.createElement("div");
toyCard.className = "card";

toyCard.innerHTML = `
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar" />
  <p>${toy.likes} Likes</p>
  <button class="like-btn" id="${toy.id}">Like ❤️</button>
`;

// Adding event listener for like button
const likeBtn = toyCard.querySelector(".like-btn");
likeBtn.addEventListener("click", () => {
  increaseLikes(toy.id, toy.likes);
});

toyCollection.appendChild(toyCard);
}

// Creating a new toy
function createToy(name, image) {
fetch("http://localhost:3000/toys", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    name: name,
    image: image,
    likes: 0
  })
})
.then(response => {
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
})
.then(newToy => {
  renderToy(newToy);
  document.querySelector(".add-toy-form").reset(); // Reseting form fields
})
.catch(error => console.error("There was a problem with the fetch operation:", error));
}

// Increase likes for a toy
function increaseLikes(toyId, currentLikes) {
const newLikes = currentLikes + 1;

fetch(`http://localhost:3000/toys/${toyId}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    likes: newLikes
  })
})
.then(response => {
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
})
.then(updatedToy => {
  // Update the DOM with the new likes count
  const toyCard = document.getElementById(toyId).parentElement;
  toyCard.querySelector('p').innerText = `${updatedToy.likes} Likes`;
})
.catch(error => console.error("There was a problem with the fetch operation:", error));
}