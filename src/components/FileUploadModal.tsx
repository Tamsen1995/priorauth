import React, { useState } from "react";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
      <div className="bg-white p-8 shadow-2xl max-w-3xl w-full relative transition-all duration-500 ease-in-out animate-fade-in">
        <button
          onClick={onRequestClose}
          className="absolute top-4 right-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded-md focus:outline-none focus:shadow-outline"
        >
          CLOSE{" "}
        </button>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-lg font-bold mb-2"
            htmlFor="file1"
          >
            <CloudUploadIcon /> Choose first file
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
            type="file"
            id="file1"
            accept=".pdf"
            onChange={onFile1Change}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-lg font-bold mb-2"
            htmlFor="file2"
          >
            <CloudUploadIcon /> Choose second file
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
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isLoading || !file1 || !file2}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>
    </Modal>
  );
};

export default FileUploadModal;
