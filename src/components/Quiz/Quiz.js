import React from "react";
import "./Quiz.css";

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [
        {
          questionText: "What is the capital of France?",
          answerOptions: [
            { answerText: "New York", isCorrect: false },
            { answerText: "London", isCorrect: false },
            { answerText: "Paris", isCorrect: true },
            { answerText: "Dublin", isCorrect: false },
          ],
        },
        {
          questionText: "Who is CEO of Tesla?",
          answerOptions: [
            { answerText: "Jeff Bezos", isCorrect: false },
            { answerText: "Elon Musk", isCorrect: true },
            { answerText: "Bill Gates", isCorrect: false },
            { answerText: "Tony Stark", isCorrect: false },
          ],
        },
        {
          questionText: "The iPhone was created by which company?",
          answerOptions: [
            { answerText: "Apple", isCorrect: true },
            { answerText: "Intel", isCorrect: false },
            { answerText: "Amazon", isCorrect: false },
            { answerText: "Microsoft", isCorrect: false },
          ],
        },
        {
          questionText: "How many Harry Potter books are there?",
          answerOptions: [
            { answerText: "1", isCorrect: false },
            { answerText: "4", isCorrect: false },
            { answerText: "6", isCorrect: false },
            { answerText: "7", isCorrect: true },
          ],
        },
      ],
      currentQuestion: 0,
      showScore: false,
      score: 0,
    };

    this.handleAnswerClickTest = this.handleAnswerClickTest.bind(this);
  }

  /**
   * Handles the click event of an answer option.
   *
   * Updates the current question index and score based on the correctness of the answer.
   * If the current question is the last one, it sets the showScore flag to true.
   *
   * @param {boolean} isCorrect - Whether the selected answer is correct or not.
   * @return {void}
   */
  handleAnswerClickTest(isCorrect) {
    // If the current question is the last one, update the showScore flag and score
    if (this.state.currentQuestion === this.state.questions.length - 1) {
      // we have 4 questions but index starts from 0 so we have 3

      // that's why we use ''this.state.questions.length - 1''
      this.setState(
        {
          showScore: true, // Set the showScore flag to true
          score: isCorrect ? this.state.score + 1 : this.state.score, // Update the score based on the correctness of the answer
        },
        () => {
          console.log({ score: this.state.score }); // Log the score after state update
        }
      );
    } else {
      // If the current question is not the last one, update the current question index and score
      this.setState((prevState) => ({
        currentQuestion: prevState.currentQuestion + 1, // Update the current question index
        score: isCorrect ? prevState.score + 1 : prevState.score, // Update the score based on the correctness of the answer
      }));
    }
  }

  /**
   * Handles the click event of an answer option.
   *
   * Updates the current question index and score based on the correctness of the answer.
   * If the current question is the last one, it sets the showScore flag to true.
   *
   * @param {boolean} isCorrect - Whether the selected answer is correct or not.
   * @return {void}
   */

  render() {
    const { questions, currentQuestion, showScore, score } = this.state;

    // This line is using object destructuring to extract the properties from the state object.
    // It assigns the values of the properties to variables with the same name.
    // This allows us to use these variables directly in the JSX without having to use `this.state` multiple times.
    // It reduces the amount of typing and makes the code more readable.
    // For example, `const { questions } = this.state;` is equivalent to `const questions = this.state.questions;`

    return (
      <div className="app">
        {showScore ? (
          <div className="score-section">
            You scored {score} out of {questions.length}
          </div>
        ) : (
          <>
            {/* Display the current question and its answer options */}
            <div className="question-section">
              <div className="question-counter">
                {/* Display the current question number */}
                <h2>Question {currentQuestion + 1}</h2>
                <div className="all-question-length">/{questions.length}</div>
              </div>
              <div className="question-text">
                {/* Display the question text */}
                {questions[currentQuestion].questionText}
              </div>
              <div className="answer-section">
                {/* Map over the answer options and display them as buttons */}
                {questions[currentQuestion].answerOptions.map(
                  (answer, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        this.handleAnswerClickTest(answer.isCorrect)
                      }
                    >
                      {/* Display the answer text */}
                      {answer.answerText}
                    </button>
                  )
                )}
              </div>
            </div>
            {/* Display a 'Next' button if there are more questions */}
            {currentQuestion < questions.length - 1 ? (
              <button
                style={{
                  width: "70px",
                  height: "35px",
                  textAlign: "center",
                  display: "flex",
                  position: "absolute",
                  top: "490px",
                  left: "915px",
                }}
                onClick={() => this.handleAnswerClickTest(false)} // Call with 'false' since no answer is correct when just moving to next
              >
                <p className="p-next" style={{ margin: "5px" }}>
                  Next
                </p>
              </button>
            ) : (
              <button
                style={{
                  width: "70px",
                  height: "35px",
                  display: "flex",
                  position: "absolute",
                  top: "531px",
                  left: "100px",
                }}
                onClick={() => this.handleAnswerClickTest(false)} // Call with 'false' since no answer is correct when just moving to next
              >
                Result
              </button>
            )}
          </>
        )}
      </div>
    );
  }
}
