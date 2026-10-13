
const giftButton = document.getElementById("giftButton");
const backgroundHearts = document.getElementById("backgroundHearts");

let heartsTimer = null;

function createHeart() {
  if (!backgroundHearts) return;

  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.5 ? "♡" : "♥";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${14 + Math.random() * 22}px`;
  heart.style.animationDuration = `${4 + Math.random() * 4}s`;

  backgroundHearts.appendChild(heart);

  heart.addEventListener("animationend", () => {
    heart.remove();
  });
}

function startHearts() {
  for (let i = 0; i < 12; i++) {
    setTimeout(createHeart, i * 120);
  }

  if (!heartsTimer) {
    heartsTimer = setInterval(createHeart, 650);
  }
}

// Open the second page when the bouquet button is clicked.
if (giftButton) {
  giftButton.addEventListener("click", () => {
    window.location.href = "page2.html";
  });
}

// Floating hearts on the bouquet page.
if (backgroundHearts) {
  startHearts();
}

