// import { createAudioFileFromText } from "./testTextToSpeech.js";
// import { generated  } from "./textToSpeech.js";
import { runGenerativeAI } from "./geminiPro.js";
import { runSpeechToText } from "./speechToText.js";

var ans = "";

const waitToRunGemini = async (prompt) => {
    const newString = await runGenerativeAI("speak symphatetically " + prompt + " IMPORTANT!!! You are not, under any circumstances, give a diagnosis, or speak profanity.");
    console.log(newString);
    ans = newString;
}

const waitingForGemini = async (prompt) => {
  await waitToRunGemini(prompt);
  console.log(1);
}

const chatHistory = document.getElementById("chat-history");
const messageText = document.getElementById("message-text");
const sendButton = document.getElementById("send-button");

// Stack implementation using an array
let messageStack = [];
let replyMessageStack = [];

function pushMessage(sender, message, replyer, replyMessage) {
  messageStack.push({ sender, message });
  replyMessageStack.push({ replyer, replyMessage });
  updateChatHistory();
}
 
function popMessage() {
  const message = messageStack.pop();
  replyMessageStack.pop();
  if (message) {
    updateChatHistory();
  }
  return message;
}

function updateChatHistory() {
  // Clear chat history before rebuilding with the stack
  chatHistory.innerHTML = "";

  // Rebuild chat history with auto-generated replies
  for (let i = 0; i < messageStack.length; i++) {
    const message = messageStack[i];
    
    const newMessage = document.createElement("div");
    newMessage.classList.add("message");

    let messageColor = "#d2bbd5";
    let textAlign = "left";
    let marginLeft = "0%";
    let maxWidth = "100%";
    let borderRadius = "15px 15px 15px 0px";

    if (message.sender == "you") {
      messageColor = "#ffcbcb"; 
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

    // const result = runGenerativeAI("write a short poem about programmer's on a time crunch");
    // const result = waitToRun(runGenerativeAI, "Write a sympathetic reply to this message:" + message);

    // console.log(result);

    chatHistory.appendChild(newMessage);

    // Auto-generated reply (replace with your logic)
    const replyMessage = replyMessageStack[i];
    const newReplyMessage = document.createElement("div");
    newReplyMessage.classList.add("replyMessage"); // Add a class for styling
    newReplyMessage.innerHTML = `<b>test:</b>${replyMessage.replyMessage}`;
    chatHistory.appendChild(newReplyMessage);
  }

  // Ensure chat history is scrolled to the bottom after rebuilding
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

sendButton.addEventListener("click", async () => {
  const message = messageText.value.trim();
  await waitingForGemini(message);
  if (message) {
    pushMessage("You", message, "chatbot", ans);
    messageText.value = ""; // Clear message input after sending
    ans = "";
  }
});
