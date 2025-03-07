import fs from "fs";
import path from "path";

export function getJsonFilepath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

export function extractJsonContent(filepath) {
  const currentFile = fs.readFileSync(filepath);
  return JSON.parse(currentFile);
}

function handler(req, res) {
  if (req.method == "POST") {
    const newFeedback = {
      id: Date.now(),
      email: req.body.email,
      feedback: req.body.feedback,
    };

    const filepath = getJsonFilepath();
    const existingData = extractJsonContent(filepath);
    existingData.push(newFeedback);
    fs.writeFileSync(filepath, JSON.stringify(existingData, null, 2));
    res.status(201).json({ message: "Feedback Saved", feedback: newFeedback });
  } else {
    const filepath = getJsonFilepath();
    const savedDetails = extractJsonContent(filepath);
    res.status(200).json({ feedbacks: savedDetails });
  }
}
export default handler;
