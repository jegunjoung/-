const SERVER_URL = 'https://chat-ai-server-3vyo.onrender.com'; //랜더로고화면위주소

function appendMessage(sender, text) {
  const msgBox = document.getElementById('messages');
  const msg = document.createElement('div');
  msg.textContent = sender + ": " + text;
  msgBox.appendChild(msg);
  msgBox.scrollTop = msgBox.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById('userInput');
  const text = input.value;
  if (!text) return;
  appendMessage("나", text);
  input.value = "";

  const res = await fetch(SERVER_URL + "/chat", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ message: text })
  });

  const data = await res.json();
  appendMessage("AI", data.reply);
}

async function endConsult() {
  const name = document.getElementById("userName").value;
  const contact = document.getElementById("userContact").value;
  const photo = document.getElementById("photoInput").files[0];

  const formData = new FormData();
  formData.append("name", name);
  formData.append("contact", contact);
  formData.append("photo", photo);

  const res = await fetch(SERVER_URL + "/send-kakao", {
    method: "POST",
    body: formData
  });

  const result = await res.text();
  alert("상담이 종료되었습니다. 결과: " + result);
}