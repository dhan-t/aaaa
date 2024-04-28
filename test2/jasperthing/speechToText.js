import { AssemblyAI } from "assemblyai";

// const ASSEMBLYAI_API_KEY = "7179c24ed31c45a3b0478f769c8ecf51";

const ASSEMBLYAI_API_KEY = "7179c24ed31c45a3b0478f769c8ecf51";

const client = new AssemblyAI({
  apiKey: ASSEMBLYAI_API_KEY
});

var tempString = "";

const speechToText = async (audioFile) => {
  const config = {
    audio_url: audioFile // audioFile is the file of the audio
  }

  const transcript = await client.transcripts.create(config);
  tempString = transcript.text;
}

const runSpeechToText = async (audioFile) => {
    await speechToText(audioFile);

    return tempString;
}

export { runSpeechToText };
// runSpeechToText("./test.mp3")
