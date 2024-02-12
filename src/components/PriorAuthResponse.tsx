import React, { useState, FC } from "react";

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
}

export interface PriorAuthData {
  procedure_name: string;
  case_id: string;
  status: string;
  summary: string;
  steps: Step[];
}

const Collapsible: FC<{ title: string; content: JSX.Element }> = ({
  title,
  content,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 bg-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-2 px-4 text-left font-semibold bg-gray-300 hover:bg-gray-400 focus:outline-none transition-colors duration-200"
      >
        {title}
      </button>
      {isOpen && <div className="p-4">{content}</div>}
    </div>
  );
};

const PriorAuthResponse: FC<{ data: PriorAuthData }> = ({ data }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">
        Procedure: {data.procedure_name}
      </h2>
      <p className="mb-2 text-gray-700">
        <strong className="font-semibold">Case ID:</strong> {data.case_id}
      </p>
      <p className="mb-2 text-gray-700">
        <strong className="font-semibold">Status:</strong> {data.status}
      </p>
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
                    <li key={option.key} className="mb-1">
                      {option.text} {option.selected ? "(Selected)" : ""}
                    </li>
                  ))}
                </ul>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default PriorAuthResponse;
