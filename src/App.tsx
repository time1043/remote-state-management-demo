import { useEffect, useState } from "react";

export default function App() {
  const [advice, setAdvice] = useState("Advice ...");

  async function getAdvice() {
    // https://api.adviceslip.com/
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();

    setAdvice(data.slip.advice);
  }

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <main>
      <h1>Advice App</h1>
      <p>{advice}</p>
      <button onClick={getAdvice}>Get Advice</button>
    </main>
  );
}
