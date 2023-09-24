import React, { useEffect, useState } from "react";

import file from "/file.svg";
import { BeatLoader } from "react-spinners";

type FileUploadContent = {
  fileContent: string | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const FileUpload = ({ fileContent, handleFileChange }: FileUploadContent) => {
  // isloading required while uploading a file
  const [isLoading, setIsLoading] = useState(false);

  // here the loading state is considered as a side effect of the file content changing hence useEffect is required.

  useEffect(() => {
    if (fileContent) setIsLoading(true);
    // temporarity setting a timer
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [fileContent]);

  return (
    <>
      <label className="w-full text-left pb-6">Upload JSON File</label>
      <div className="rounded-lg flex justify-center items-center bg-gray-200/40 outline-dashed outline-gray-300 border-gray-300 p-4 w-full h-[8rem] relative">
        <label className="grid place-items-center text-lg font-semibold mb-2 absolute cursor-pointer">
          {!isLoading && <img src={file} />}
          <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        {isLoading && (
          <>
            <BeatLoader
              color="#3062C8"
              loading={isLoading}
              size={10}
              aria-label="Validating"
            />
            <label className="text-gray-500 mt-1 text-xs">Validating</label>
          </>
        )}
      </div>
      <label className="w-full text-left">File Content:</label>
      <div className="mt-4 w-full  max-h-[15rem] relative px-2 rounded-lg m-h-[5rem] overflow-auto">
        {fileContent && !isLoading && (
          <pre className="w-fit h-fit p-2 bg-gray-200 rounded-xl">
            {fileContent}
          </pre>
        )}
      </div>
    </>
  );
};

export default FileUpload;
