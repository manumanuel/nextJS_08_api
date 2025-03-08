import { getJsonFilepath, extractJsonContent } from "./api/feedback/index";
import { Fragment, useState } from "react";

function FeedbackPage(props) {
  const [userInfo, setUserInfo] = useState("");

  function selectedFeedbackHandler(id) {
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data) => setUserInfo(data.feedback.email));
  }

  return (
    <Fragment>
      <p>{userInfo}</p>
      <ul>
        {props.feedbackList.map((feedback) => (
          <li key={feedback.id}>
            {feedback.feedback}{" "}
            <button onClick={selectedFeedbackHandler.bind(null, feedback.id)}>
              details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
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
