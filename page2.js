const envelope = document.getElementById("envelope");
const letterContent = document.getElementById("letterContent");
const envelopeHint = document.getElementById("envelopeHint");
const closeLetter = document.getElementById("closeLetter");

envelope.addEventListener("click", () => {
  envelope.classList.add("open");
  envelope.setAttribute("aria-expanded", "true");
  letterContent.hidden = false;
  envelopeHint.textContent = "A little note, written just for you ♡";
});

closeLetter.addEventListener("click", () => {
  letterContent.hidden = true;
  envelope.classList.remove("open");
  envelope.setAttribute("aria-expanded", "false");
  envelopeHint.textContent = "Tap the envelope to open it ♡";
});
 

// Add several photos using the main upload button.
const photoUpload = document.getElementById("photoUpload");
const photoGrid = document.getElementById("photoGrid");

photoUpload.addEventListener("change", (event) => {
  addPhotos(event.target.files);
  photoUpload.value = "";
});

// Add a photo to one of the existing photo frames.
document.querySelectorAll(".single-photo").forEach((input) => {
  input.addEventListener("change", () => {
    if (input.files.length) {
      showPhoto(input.files[0], input.closest(".photo-card"));
    }
    input.value = "";
  });
});

function addPhotos(files) {
  Array.from(files).forEach((file) => {
    if (!file.type.startsWith("image/")) return;

    const card = document.createElement("div");
    card.className = "photo-card photo-placeholder";
    card.innerHTML = `
      <span>＋</span>
      <span>Our memory</span>
    `;

    photoGrid.appendChild(card);
    showPhoto(file, card);
  });
}

function showPhoto(file, card) {
  if (!file.type.startsWith("image/")) return;

  const oldImage = card.querySelector("img");
  if (oldImage) {
    URL.revokeObjectURL(oldImage.src);
    oldImage.remove();
  }

  card.querySelectorAll(".remove-photo").forEach((button) => {
    button.remove();
  });

  card.classList.add("has-photo");

  const image = document.createElement("img");
  image.src = URL.createObjectURL(file);
  image.alt = "Our special memory";
  card.appendChild(image);

  const removeButton = document.createElement("button");
  removeButton.className = "remove-photo";
  removeButton.type = "button";
  removeButton.textContent = "×";
  removeButton.setAttribute("aria-label", "Remove photo");

  removeButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    URL.revokeObjectURL(image.src);
    card.remove();
  });

  card.appendChild(removeButton);
}

// Voice message player.
setupAudioUpload({
  inputId: "voiceUpload",
  playerId: "voicePlayer",
  statusId: "voiceStatus",
  label: "Voice message ready to play ♡"
});

// Our song player.
setupAudioUpload({
  inputId: "songUpload",
  playerId: "songPlayer",
  statusId: "songStatus",
  label: "Your special song is ready ♡"
});

function setupAudioUpload({ inputId, playerId, statusId, label }) {
  const input = document.getElementById(inputId);
  const player = document.getElementById(playerId);
  const status = document.getElementById(statusId);

  let currentAudioUrl = null;

  input.addEventListener("change", () => {
    const file = input.files[0];
    if (!file) return;

    if (!file.type.startsWith("audio/")) {
      status.textContent = "Please select an audio file.";
      input.value = "";
      return;
    }

    if (currentAudioUrl) {
      URL.revokeObjectURL(currentAudioUrl);
    }

    currentAudioUrl = URL.createObjectURL(file);
    player.src = currentAudioUrl;
    player.hidden = false;
    status.textContent = file.name;
    player.load();
  });
}
