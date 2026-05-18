import { useEffect, useState } from "react";

export default function App() {
  const [advice, setAdvice] = useState("Advice ...");
  const [isLoading, setIsLoading] = useState(false);

  async function getAdvice() {
    setIsLoading(true);

    // https://api.adviceslip.com/
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();

    setAdvice(data.slip.advice);
    setIsLoading(false);
  }

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <main>
      <h1>Advice App</h1>
      <p>{isLoading ? "Loading..." : advice}</p>
      <button onClick={getAdvice} disabled={isLoading}>
        Get Advice
      </button>
    </main>
  );
}
