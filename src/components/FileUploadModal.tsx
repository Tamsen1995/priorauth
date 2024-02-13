import React, { useState } from "react";
import Modal from "react-modal";

interface FileUploadModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

function useFileInput() {
  const [file, setFile] = useState<File | null>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
  };

  return { file, onFileChange };
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  isOpen,
  onRequestClose,
  onSubmit,
  isLoading,
}) => {
  const { file: file1, onFileChange: onFile1Change } = useFileInput();
  const { file: file2, onFileChange: onFile2Change } = useFileInput();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="File Upload Modal"
      className="flex items-center justify-center outline-none border-0 transition-all duration-500 ease-in-out animate-fade-in"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-all duration-500 ease-in-out animate-fade-in"
    >
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full relative transition-all duration-500 ease-in-out animate-fade-in">
        <button
          onClick={onRequestClose}
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        >
          X
        </button>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="file1"
          >
            Choose first file
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
            type="file"
            id="file1"
            accept=".pdf"
            onChange={onFile1Change}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="file2"
          >
            Choose second file
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
            type="file"
            id="file2"
            accept=".pdf"
            onChange={onFile2Change}
          />
        </div>
        <button
          onClick={onSubmit}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isLoading || !file1 || !file2}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>
    </Modal>
  );
};

export default FileUploadModal;
