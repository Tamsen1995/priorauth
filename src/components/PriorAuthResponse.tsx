import React, { useState, FC } from "react";

export interface Evidence {
  content: string;
  page_number: number;
  pdf_id: string;
  event_datetime?: string;
}

export interface Option {
  key: string;
  text: string;
  selected?: boolean;
}

export interface Step {
  key: string;
  question: string;
  reasoning: string;
  options: Option[];
  evidence?: Evidence[];
}

export interface PriorAuthData {
  procedure_name: string;
  case_id: string;
  status: string;
  summary: string;
  cpt_codes: string[];
  is_met: boolean;
  steps: Step[];
}

const Collapsible: FC<{ title: string; content: JSX.Element }> = ({
  title,
  content,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 bg-white rounded-lg shadow-md overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-2 px-4 text-left font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none transition-colors duration-200"
      >
        {title}
      </button>
      {isOpen && <div className="p-4">{content}</div>}
    </div>
  );
};

const PriorAuthResponse: FC<{ data: PriorAuthData }> = ({ data }) => {
  return (
    <div className="p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">
        Procedure: {data.procedure_name}
      </h2>
      <p className="mb-2 text-gray-700">
        <strong className="font-semibold">Case ID:</strong> {data.case_id}
      </p>
      <p className="mb-2 text-gray-700">
        <strong className="font-semibold">Status:</strong> {data.status}
      </p>
      <p className="mb-2 text-gray-700">
        <strong className="font-semibold">CPT Codes:</strong>{" "}
        {data.cpt_codes.join(", ")}
      </p>
      <div
        className={`mb-4 font-bold ${
          data.is_met ? "text-green-500" : "text-red-500"
        }`}
      >
        Determination: {data.is_met ? "Approved" : "Denied"}
      </div>
      <p className="mb-4 text-gray-700">
        <strong className="font-semibold">Summary:</strong> {data.summary}
      </p>
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2 text-blue-600">Steps:</h3>
        {data.steps.map((step, index) => (
          <Collapsible
            key={step.key}
            title={`Step ${index + 1}: ${step.question}`}
            content={
              <div className="p-2 text-gray-700">
                <p className="mb-2">{step.reasoning}</p>
                <ul className="list-disc list-inside">
                  {step.options.map((option) => (
                    <div key={option.key} className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        checked={option.selected}
                        className="form-checkbox h-5 w-5 text-blue-600"
                        readOnly
                      />
                      <label className="ml-2 text-gray-700">
                        {option.text}
                      </label>
                    </div>
                  ))}
                </ul>
                {step.evidence && step.evidence.length > 0 && (
                  <>
                    <h4 className="mt-4 mb-2 font-semibold">Evidence:</h4>
                    <ul className="list-disc list-inside">
                      {step.evidence.map((evidence, eIndex) => (
                        <li key={eIndex} className="text-sm">
                          {evidence.content} - Page {evidence.page_number}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default PriorAuthResponse;
