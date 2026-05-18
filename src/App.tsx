import { useEffect, useState, useTransition } from "react";

export default function App() {
  const [advice, setAdvice] = useState("Advice ...");
  const [isPending, startTransition] = useTransition();

  function getAdvice() {
    startTransition(async () => {
      // https://api.adviceslip.com/
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();

      setAdvice(data.slip.advice);
    });
  }

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <main>
      <h1>Advice App</h1>
      <p>{isPending ? "Loading..." : advice}</p>
      <button onClick={getAdvice} disabled={isPending}>
        Get Advice
      </button>
    </main>
  );
}
