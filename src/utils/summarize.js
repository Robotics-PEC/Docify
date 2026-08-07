import { pipeline } from "@huggingface/transformers";

export const summarizeText = async (inputText) => {
  // Load summarization model
  const summarizer = await pipeline("summarization");

  const result = await summarizer(inputText, {
    max_length: 100,
    min_length: 25,
    length_penalty: 2.0,
    num_beams: 4,
    early_stopping: true,
  });

  console.log({result});

  if (result && result.length > 0) {
    return result[0].summary_text;
  } else {
    throw new Error("Unexpected response format");
  }
};
