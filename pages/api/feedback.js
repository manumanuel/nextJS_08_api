import fs from "fs";
import path from "path";

function handler(req, res) {
  debugger;
  if (req.method == "POST") {
    const newFeedback = {
      id: Date.now(),
      email: req.body.email,
      feedback: req.body.feedback,
    };

    const filepath = path.join(process.cwd(), "data", "feedback.json");
    const currentFile = fs.readFileSync(filepath);
    const existingData = JSON.parse(currentFile);
    existingData.push(newFeedback);
    fs.writeFileSync(filepath, JSON.stringify(existingData, null, 2));
    res.status(201).json({ message: "Feedback Saved", feedback: newFeedback });
  } else {
    res.status(200).json({ message: "working" });
  }
}
export default handler;
