import { useQuery } from "@tanstack/react-query";

async function fetchAdvice() {
  const response = await fetch("https://api.adviceslip.com/advice");
  const data = await response.json();

  return data.slip.advice;
}

export default function App() {
  const {
    data: advice,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["advice"],
    queryFn: fetchAdvice,
  });

  return (
    <main>
      <h1>Advice App</h1>
      <p>{isFetching ? "Loading..." : advice}</p>
      <button onClick={() => refetch()} disabled={isFetching}>
        Get Advice
      </button>
    </main>
  );
}
