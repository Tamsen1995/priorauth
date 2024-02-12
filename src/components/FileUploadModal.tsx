import React from "react";
import Modal from "react-modal";

interface FileUploadModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  isOpen,
  onRequestClose,
  onSubmit,
  isLoading,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="File Upload Modal"
    className="flex items-center justify-center outline-none border-0"
    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full relative">
      <button
        onClick={onRequestClose}
        className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
      >
        X
      </button>
      <h2 className="text-2xl font-bold mb-4 text-center">Upload files</h2>
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
        />
      </div>
      <button
        onClick={onSubmit}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </div>
  </Modal>
);

export default FileUploadModal;
