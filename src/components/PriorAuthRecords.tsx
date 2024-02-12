import React from "react";
import FileUploadModal from "./FileUploadModal";

interface Props {}

const PriorAuthRecords: React.FC<Props> = () => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const createPriorAuth = () => {
    console.log("Create Prior Auth button clicked");
  };
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Prior Auth Records</h1>
        </div>
        <div className="w-full max-w-4xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center py-10">
              <div>Icon PlaceHolder</div>
              <span className="text-gray-700 text-lg">
                No prior auth records found
              </span>
            </div>
            <button
              onClick={openModal}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Create Prior Auth
            </button>
          </div>
        </div>
      </div>
      <FileUploadModal isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default PriorAuthRecords;
