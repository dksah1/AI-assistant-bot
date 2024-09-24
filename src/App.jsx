import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [copied, setCopied] = useState(false);

  async function generateAnswer() {
    setAnswer("loading...");

    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${
        import.meta.env.VITE_APP_GEMINI_API_KEY
      }`,
      method: "post",
      data: { contents: [{ parts: [{ text: question }] }] },
    });
    try {
      setAnswer(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
      // console.log(
      //   "response",
      //   response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      // );
    } catch (error) {
      console.log(error);
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-white to-purple-200 flex flex-col items-center justify-start">
      <header className="rounded-b-md w-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg pb-4 sm:p-4 animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center  flex-col sm:flex-row ">
          <img
            className="rounded-b-2xl h-20 w-32 mb-2 sm:h-24  "
            src="/src/assets/bob.jpg"
            alt="BOB"
            height={60}
            width={120}
          />
          <h1 className="text-4xl font-extrabold text-gray-300 font-serif text-center sm:pl-96">
            Bob AI Assistant
          </h1>
        </div>
      </header>

      <main className="flex-grow w-full max-w-screen-lg mt-10 p-4 sm:p-6 md:p-8 lg:p-10 bg-white rounded-lg shadow-lg animate-fade-in transform transition duration-500 ease-in-out">
        <div className="flex flex-col space-y-6">
          <textarea
            value={question}
            rows="5"
            className="border border-gray-300 rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-300 transform hover:scale-105"
            placeholder="Type your question..."
            onChange={(e) => setQuestion(e.target.value)}
          ></textarea>
          <button
            onClick={generateAnswer}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-md hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform duration-300 transform hover:scale-105"
          >
            Generate Answer
          </button>
          <div className="bg-gray-100 p-4 rounded-md overflow-y-auto relative">
            <div className="flex items-start space-x-4">
              <pre className="text-gray-700 bg-white p-3 rounded-lg shadow-md w-full whitespace-pre-wrap break-words">
                {answer}
              </pre>
              {answer ? (
                <button
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                >
                  {copied ? (
                    <span className="animate-slide-right">⚡︎</span>
                  ) : (
                    <span>📋</span>
                  )}
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
