import { useState } from "react";
import "./App.css";
import email from "/email.svg";
import success from "/success.svg";

import FileUpload from "./components/FileUpload";
function App() {
  const [submit, setSubmit] = useState(false);
  const [fileContent, setFileContent] = useState<string | null>(null);

  // the following functions adds these functionalities:
  // it file is json reads the data and sets the file content;
  // else sends error for any non-json files;
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      if (selectedFile.type === "application/json") {
        const reader = new FileReader();

        reader.onload = (e) => {
          const content = e.target?.result as string;
          setFileContent(content);
        };

        reader.readAsText(selectedFile);
      } else {
        alert("Please select a JSON file.");
      }
    }
  };

  // function for form validation as well as submission

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fileContent) {
      throw Error("Add a file");
    }
    setSubmit(true);
  };

  return (
    <>
      <header className="w-full p-8 text-left font-bold bg-gray-100">
        <h1 className="text-xl"> Submit form</h1>
      </header>
      <main className="w-full h-full px-4 overflow-clip">
        <form
          onSubmit={onSubmitHandler}
          className="w-full h-full flex flex-col items-center "
        >
          <div>
            <label>Full Name</label>
            <input required placeholder="Full Name" />
          </div>{" "}
          <div className="relative">
            <label>Email</label>
            <input required placeholder="Email" />
            <img
              src={email}
              alt="email"
              className="absolute bottom-3 right-4 w-[1.5rem] h-[1.5rem]"
            />
          </div>
          <FileUpload
            fileContent={fileContent}
            handleFileChange={handleFileChange}
          />
          <div className="fixed bottom-0 p-4">
            <button className="w-full p-4 text-lg text-gray-100 bg-[#3062C8] rounded-full">
              Submit
            </button>
          </div>
        </form>
      </main>
      {submit && (
        <main className="w-screen h-screen fixed z-50 bg-black/50 flex justify-center items-center">
          <div className="bg-gray-100 w-[20rem] p-4 h-[23rem] rounded-2xl flex flex-col items-center gap-4 justify-center">
            <img src={success} className="w-1/2 h-1/2" />
            <h2>Entries successfully uploaded</h2>
            <button className="w-full bg-[#3062C8] py-3 rounded-full text-gray-100 font-medium">
              Go to My Entries
            </button>
            <button
              onClick={() => setSubmit(false)}
              className="text-[#3062C8] bg-[#3062C8]/20 w-full rounded-full py-3"
            >
              Cancel
            </button>
          </div>
        </main>
      )}
    </>
  );
}

export default App;
