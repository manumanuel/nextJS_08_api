import { useRef, useState } from "react";

function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();
  const [feedbacks, setFeedbacks] = useState([]);

  function submitHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = { email: enteredEmail, feedback: enteredFeedback };
    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function loadSavedFeedbacks() {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => setFeedbacks(data.feedbacks));
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailInputRef}></input>
        </div>
        <div>
          <label htmlFor="feedback">Feedback</label>
          <textarea
            type="text"
            id="feedback"
            rows={5}
            ref={feedbackInputRef}
          ></textarea>
        </div>
        <button>submit</button>
      </form>
      <button onClick={loadSavedFeedbacks}>Load Feedbacks</button>
      <ul>
        {feedbacks.map((feedback) => (
          <li key={feedback.id}>{feedback.feedback}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
