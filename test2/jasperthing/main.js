// import { createAudioFileFromText } from "./testTextToSpeech.js";
// import { generated  } from "./textToSpeech.js";
import { runGenerativeAI } from "./geminiPro.js";
import { runSpeechToText } from "./speechToText.js";

var geminiAns = "";
var speechToTextString = "";

const waitToRunGemini = async (prompt) => {
  const newString = await runGenerativeAI(
    "speak symphatetically " +
      prompt +
      " IMPORTANT!!! You are not, under any circumstances, give a diagnosis, or speak profanity."
  );
  console.log(newString);
  geminiAns = newString;
};

const waitToRunAssembly = async (audioFile) => {
  const newString = await runSpeechToText(audioFile);
  console.log(newString);
  speechToTextString = newString;
};

const waitingForAssembly = async (audioFile) => {
  await waitToRunAssembly(audioFile);
  console.log(1);
};

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

const button = document.querySelector("button");

// set the options of this 3rd party mp3 js encoder
const recorder = new MicRecorder({
  bitRate: 128,
});

// start recording with a click of the button
button.addEventListener("click", startRecording);
// start the recording
function startRecording() {
  recorder
    .start()
    .then(() => {
      button.textContent = "Stop recording";
      button.classList.toggle("btn-danger");
      button.removeEventListener("click", startRecording);
      button.addEventListener("click", stopRecording);
    })
    .catch((e) => {
      console.error(e);
    });
}
var fileToDownload;
var blobs;
// stop the recording
function stopRecording() {
  console.log("testtttt");
  // create the mp3
  recorder
    .stop()
    .getMp3()
    .then(async ([buffer, blob]) => {
      // create the file
      const file = new File(buffer, "audio.mp3", {
        type: blob.type,
        lastModified: Date.now(),
      });

      // display the as an Audio object
      const li = document.createElement("li");
      const player = new Audio(URL.createObjectURL(file));
      console.log(player);
      player.controls = true;

      // reset
      button.textContent = "Start recording";
      button.classList.toggle("btn-danger");
      button.removeEventListener("click", stopRecording);

      // dispatchEvent("fireAssembly");
      button.addEventListener("click", startRecording);
      fileToDownload = URL.createObjectURL(file);

      blobs = await fetch(fileToDownload).then((r) => r.blob());
      const downloadLink = downloadBlob(fileToDownload, "audio.mp3");

      downloadLink.title = "aaaaaaa";
      downloadLink.classList.add("btn-link", "download-link");

      downloadLink.textContent = "Export Records";

      document.body.appendChild(downloadLink);

      downloadBlob(blobs);
    })
    .catch((e) => {
      console.log(e);
    });
}

function downloadBlob(blob) {
  // Create an object URL for the blob object
  const url = blob;

  // Create a new anchor element
  const a = document.createElement("a");

  a.href = url;
  a.download =
    "C:/Users/Dhan Michea/Downloads/aaaa-main/aaaa-main/test2/audio.mp3" ||
    "download";

  // Click handler that releases the object URL after the element has been clicked
  // This is required for one-off downloads of the blob content
  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url);
      removeEventListener("click", clickHandler);
    }, 150);
  };

  // Add the click event listener on the anchor element
  // Comment out this line if you don't want a one-off download of the blob content
  a.addEventListener("click", clickHandler, false);

  a.click();

  return a;
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
    pushMessage("You", message, "chatbot", geminiAns);
    messageText.value = ""; // Clear message input after sending
    geminiAns = "";
  }
});
