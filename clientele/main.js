// Socket connection to the server
const socket = io();

// Query DOM elements
const response = document.getElementById("response");
const chat_bot = document.getElementById("chat_bot");
const push = document.getElementById("push");

//  To attach a message to chatty
function attachMessage(message, sender) {
  const messageElement = document.createElement("div");
  messageElement.className = "message-text";
  messageElement.id = sender;
  messageElement.textContent = message;

  const timestamp = new Date().toLocaleTimeString();
  const timestampElement = document.createElement("span");
  timestampElement.className = "timestamp";
  timestampElement.textContent = timestamp;

  const messageContainer = document.createElement("div");
  const messageOuterContainer = document.createElement("div");
  messageContainer.className = "message-container " + sender;
  messageOuterContainer.className = "message-outer-container " + sender;
  messageElement.innerHTML = message.replace(/\n/g, "<br>");
  messageOuterContainer.appendChild(messageContainer);
  messageContainer.appendChild(messageElement);
  messageContainer.appendChild(timestampElement);
  chat_bot.appendChild(messageOuterContainer);
  chat_bot.scrollTop = chat_bot.scrollHeight;
}

// To send messages
function sendMessage() {
  const message = response.value;
  if (message === "") {
    return;
  }
  attachMessage(message, "user");
  socket.emit("user-message", message);
  response.value = "";
}

// To receive messages from the server
socket.on("bot-message", (message) => {
  attachMessage(message, "bot");
});

// Attaching event listeners
push.addEventListener("click", sendMessage);
response.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});
