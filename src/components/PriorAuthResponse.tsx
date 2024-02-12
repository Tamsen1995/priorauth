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
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>{title}</button>
      {isOpen && <div>{content}</div>}
    </div>
  );
};

const PriorAuthResponse: FC<{ data: PriorAuthData }> = ({ data }) => {
  return (
    <div>
      <h2>Procedure: {data.procedure_name}</h2>
      <p>
        <strong>Case ID:</strong> {data.case_id}
      </p>
      <p>
        <strong>Status:</strong> {data.status}
      </p>
      <p>
        <strong>Summary:</strong> {data.summary}
      </p>
      <div>
        <h3>Steps:</h3>
        {data.steps.map((step, index) => (
          <Collapsible
            key={step.key}
            title={`Step ${index + 1}: ${step.question}`}
            content={
              <div>
                <p>{step.reasoning}</p>
                <ul>
                  {step.options.map((option) => (
                    <li key={option.key}>
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
