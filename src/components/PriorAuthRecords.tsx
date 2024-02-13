import React, { useState } from "react";
import { useRouter } from "next/router";
import FileUploadModal from "./FileUploadModal";
import mockResponse from "../../fixtures/example-response.json";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

interface Props {}

const PriorAuthRecords: React.FC<Props> = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const createPriorAuth = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    return mockResponse.case_id;
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onSubmit = async () => {
    console.log("Submit button clicked");
    const priorAuthId = await createPriorAuth();
    closeModal();
    routeToNewPage(priorAuthId);
  };

  const routeToNewPage = (priorAuthId: string) => {
    router.push(`/prior-auth/${priorAuthId}`);
  };

  return (
    <div className="container mx-auto p-4 h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center mb-4">
            Prior Auth Records
          </h1>
          <div className="flex flex-col items-center justify-center py-10">
            <div className="mb-4">
              <div className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-400">
                <MedicalServicesIcon className="w-28 h-28" />
              </div>
            </div>
            <span className="text-gray-700 text-lg mb-4">
              No prior auth records found
            </span>
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
      <FileUploadModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PriorAuthRecords;
