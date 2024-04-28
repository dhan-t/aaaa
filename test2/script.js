const chatHistory = document.getElementById("chat-history");
const messageText = document.getElementById("message-text");
const sendButton = document.getElementById("send-button");

// Stack implementation using an array
let messageStack = [];

function pushMessage(sender, message) {
  messageStack.push({ sender, message });
  updateChatHistory();
}
 
function popMessage() {
  const message = messageStack.pop();
  if (message) {
    updateChatHistory();
  }
  return message;
}

function updateChatHistory() {
  // Clear chat history before rebuilding with the stack
  chatHistory.innerHTML = "";

  // Rebuild chat history with auto-generated replies
  for (let i = 0; i <= messageStack.length; i++) {
    const message = messageStack[i];
    const newMessage = document.createElement("div");
    newMessage.classList.add("message");

    let messageColor = "#d2bbd5";
    let textAlign = "left";
    let marginLeft = "0%";
    let maxWidth = "100%";
    let borderRadius = "15px 15px 15px 0px";

    if (message.sender == "you") {
      messageColor = "#ffcbcb"; // Color for auto-generated replies
      textAlign = "right";
      marginLeft = "20%";
      maxWidth = "80%";
      borderRadius = "15px 15px 0px 15px";
    }
    newMessage.style.marginLeft = marginLeft;
    newMessage.style.borderRadius = borderRadius;
    newMessage.style.maxWidth = maxWidth;
    newMessage.style.textAlign = textAlign; // Set background color dynamically
    newMessage.style.backgroundColor = messageColor; // Set background color dynamically

    // User message
    newMessage.innerHTML = `<b>${message.sender}:</b> ${message.message}`;
    chatHistory.appendChild(newMessage);

    // Auto-generated reply (replace with your logic)
    const replyMessage = document.createElement("div");
    replyMessage.classList.add("message", "auto-reply"); // Add a class for styling
    replyMessage.innerHTML = `<b>Auto-Reply:</b> Hi! Thanks for your message. I'm currently unavailable but will respond soon.`;
    chatHistory.appendChild(replyMessage);
  }

  // Ensure chat history is scrolled to the bottom after rebuilding
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

sendButton.addEventListener("click", () => {
  const message = messageText.value.trim();
  if (message) {
    pushMessage("You", message);
    messageText.value = ""; // Clear message input after sending
  }
});
