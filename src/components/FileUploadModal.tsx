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
  const [fileName, setFileName] = useState("No file selected");

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "No file selected");
  };

  return { file, fileName, onFileChange };
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  isOpen,
  onRequestClose,
  onSubmit,
  isLoading,
}) => {
  const {
    file: file1,
    fileName: fileName1,
    onFileChange: onFile1Change,
  } = useFileInput();
  const {
    file: file2,
    fileName: fileName2,
    onFileChange: onFile2Change,
  } = useFileInput();

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
          className="absolute top-4 right-4 bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded-md focus:outline-none focus:shadow-outline"
        >
          CLOSE{" "}
        </button>

        <div className="mb-6">
          <label
            className="shadow h-14 appearance-none border-0 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg bg-gray-100 flex justify-between items-center cursor-pointer"
            htmlFor="file1"
          >
            <span>
              <CloudUploadIcon />
            </span>
            <span>{fileName1}</span>
            <input
              className="hidden"
              type="file"
              id="file1"
              accept=".pdf"
              onChange={onFile1Change}
            />
          </label>
        </div>

        <div className="mb-6">
          <label
            className="shadow h-14 appearance-none border-0 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg bg-gray-100 flex justify-between items-center cursor-pointer"
            htmlFor="file2"
          >
            <span>
              <CloudUploadIcon />
            </span>
            <span>{fileName2}</span>
            <input
              className="hidden"
              type="file"
              id="file2"
              accept=".pdf"
              onChange={onFile2Change}
            />
          </label>
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
