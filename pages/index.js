import { useRef } from "react";

function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

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
    </div>
  );
}

export default HomePage;
