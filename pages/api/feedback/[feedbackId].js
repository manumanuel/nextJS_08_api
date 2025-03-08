import { getJsonFilepath, extractJsonContent } from "./index";

function selectedFeedback(req, res) {
  const reqFeedbackId = req.query.feedbackId;
  const filePath = getJsonFilepath();
  const savedData = extractJsonContent(filePath);
  const selectedFeedback = savedData.find(
    (feedback) => feedback.id == reqFeedbackId
  );
  return res.status(200).json({ feedback: selectedFeedback });
}
export default selectedFeedback;
