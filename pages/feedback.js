import { revalidatePath } from "next/cache";
import { getJsonFilepath, extractJsonContent } from "../pages/api/feedback";

function FeedbackPage(props) {
  return (
    <ul>
      {props.feedbackList.map((feedback) => (
        <li key={feedback.id}>{feedback.feedback}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filepath = getJsonFilepath();
  const data = extractJsonContent(filepath);
  return {
    props: { feedbackList: data },
    revalidate: 60,
  };
}

export default FeedbackPage;
