import axios from "axios";
import { useState } from "react";
import styles from "./Ask.module.css";

const Ask = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleQuestionChange = (e: any) => {
    setQuestion(e.target.value);
  };

  const askQuestion = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/question", { question });
      setAnswer(response.data.answer);
    } catch (error) {
      console.log(error);
      setAnswer("An error has occured");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.chat}>
      <div className={styles.input}>
        <label htmlFor="">Ask a question</label>
        <textarea
          name="text"
          value={question}
          rows={10}
          cols={100}
          onChange={handleQuestionChange}
        />
      </div>
      <button
        type="button"
        onClick={askQuestion}
        disabled={loading}
        className={styles.button}
      >
        Send
      </button>
      {loading && <div className={styles.loading}>loading...</div>}
      {answer && (
        <div className={styles.answer}>
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default Ask;
