// import { ElevenLabsClient } from "elevenlabs";
// import { createWriteStream } from "fs"; 
// // import dotenv from "dotenv";

// // dotenv.config();

// const ELEVENLABS_API_KEY = "9a64965e10c088fb357b79559115fa98";

// const client = new ElevenLabsClient({
//   apiKey: ELEVENLABS_API_KEY,
// });

// const createAudioFileFromText = async (text) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//         const audio = await client.generate({
//             voice: "Rachel",
//             model_id: "eleven_multilingual_v2",
//             text,
//         });
//         const fileName = `output.mp3`;
//         const fileStream = createWriteStream(fileName);
//         console.log(audio);
//         audio.pipe(fileStream); 
//         fileStream.on("finish", () => resolve(fileName)); // Resolve with the fileName
//         fileStream.on("error", reject);
//         } catch (error) {
//         reject(error);
//         }
//     });
// };


// createAudioFileFromText("hello iber, mahal kita")

// export { createAudioFileFromText };