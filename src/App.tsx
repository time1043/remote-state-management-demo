import useSWR from "swr";

// const fetcher = (...args: [url: string, init?: RequestInit]) =>
//   fetch(...args).then((res) => res.json());
const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export default function App() {
  // Trigger once when the component mounts - useSWR
  // Trigger again when the button is clicked - mutate
  // https://swr.vercel.app/docs/mutation#bound-mutate
  // https://swr.vercel.app/docs/api#return-values
  const {
    data,
    isValidating,
    mutate: getAdvice,
  } = useSWR("https://api.adviceslip.com/advice", fetcher);
  const advice = data?.slip?.advice;

  return (
    <main>
      <h1>Advice App</h1>
      <p>{isValidating ? "Loading..." : advice}</p>
      <button onClick={getAdvice} disabled={isValidating}>
        Get Advice
      </button>
    </main>
  );
}
