const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menuBtn");
const feed = document.getElementById("feed");
const ideaInput = document.getElementById("ideaInput");

// MENU
menuBtn.onclick = () => {
  menu.classList.toggle("hidden");
};

// THEME
function toggleTheme() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

// LOGOUT (dummy)
function logout() {
  alert("Logout berhasil (simulasi)");
}

// POST IDE
function postIdea() {
  if (ideaInput.value.trim() === "") return;

  db.collection("ideas").add({
    text: ideaInput.value,
    time: firebase.firestore.FieldValue.serverTimestamp()
  });

  ideaInput.value = "";
}

// LOAD IDE REALTIME
db.collection("ideas")
  .orderBy("time", "desc")
  .onSnapshot(snapshot => {
    feed.innerHTML = "";
    snapshot.forEach(doc => {
      feed.innerHTML += `
        <div class="post">
          <p>${doc.data().text}</p>
          <button onclick="addComment('${doc.id}')">💬 Komentar</button>
          <div id="comments-${doc.id}"></div>
        </div>
      `;
      loadComments(doc.id);
    });
  });

// KOMENTAR
function addComment(ideaId) {
  const text = prompt("Tulis komentar:");
  if (!text) return;

  db.collection("ideas")
    .doc(ideaId)
    .collection("comments")
    .add({
      text,
      time: firebase.firestore.FieldValue.serverTimestamp()
    });
}

// LOAD KOMENTAR
function loadComments(ideaId) {
  db.collection("ideas")
    .doc(ideaId)
    .collection("comments")
    .orderBy("time")
    .onSnapshot(snapshot => {
      const container = document.getElementById("comments-" + ideaId);
      container.innerHTML = "";
      snapshot.forEach(doc => {
        container.innerHTML += `
          <div class="comment">↳ ${doc.data().text}</div>
        `;
      });
    });
}
