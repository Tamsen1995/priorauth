import React, { useState, FC } from "react";
import {
  Button,
  Checkbox,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Box,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { green, red } from "@mui/material/colors";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

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
  is_met: boolean;
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

const Collapsible: FC<{
  title: string;
  content: JSX.Element;
  className?: string;
}> = ({ title, content, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box mb={2} className={className}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        startIcon={<ExpandMoreIcon />}
        fullWidth
        variant="outlined"
        aria-expanded={isOpen}
      >
        {title}
      </Button>
      <Collapse in={isOpen}>
        <Paper elevation={1}>
          <Box p={2}>{content}</Box>
        </Paper>
      </Collapse>
    </Box>
  );
};

const PriorAuthResponse: FC<{ data: PriorAuthData }> = ({ data }) => {
  const renderStepsFlowIndicator = () => {
    return (
      <div className="flex items-center mb-6 overflow-x-auto">
        {data.steps.map((step, index) => (
          <div key={index} className="flex items-center mr-4">
            <div
              className={`rounded-full h-6 w-6 flex items-center justify-center text-white ${
                step.is_met ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {index + 1}
            </div>
            {index < data.steps.length - 1 && (
              <div className="flex items-center">
                <div className="flex-auto border-t border-gray-300"></div>
                <ArrowRightIcon />
                <div className="flex-auto border-t border-gray-300"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Paper elevation={3} className="m-5 p-10">
        <div className="text-2xl mb-2">Procedure: {data.procedure_name}</div>
        <div className="text-base p-5">
          <strong>Case ID:</strong> {data.case_id}
        </div>
        <div className="text-base p-5">
          <strong>Status:</strong> {data.status}
        </div>
        <div className="text-base p-5">
          <strong>CPT Codes:</strong> {data.cpt_codes.join(", ")}
        </div>
        {renderStepsFlowIndicator()}
        <div
          className={`text-lg ${
            data.is_met ? "text-green-500" : "text-red-500"
          } p-5`}
        >
          Determination: {data.is_met ? "Approved" : "Denied"}
        </div>
        <div className="text-base p-5">
          <strong>Summary:</strong>
          <span>{data.summary}</span>
        </div>
        <Box mt={2}>
          <div className="text-xl mb-2">Steps:</div>
          {data.steps.map((step, index) => (
            <Box mb={2}>
              <Collapsible
                key={step.key}
                title={`Step ${index + 1}: ${step.question}`}
                content={
                  <Box>
                    <div className="text-base p-5">{step.reasoning}</div>
                    <ul className="space-y-2">
                      {step.options.map((option) => (
                        <li
                          key={option.key}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            checked={option.selected}
                            readOnly
                            className="form-checkbox h-5 w-5 text-blue-600"
                          />
                          <p className="text-gray-700 p-5">{option.text}</p>
                        </li>
                      ))}
                    </ul>
                    {step.evidence && step.evidence.length > 0 && (
                      <Collapsible
                        title="Evidence"
                        content={
                          <List>
                            {step.evidence.map((evidence, eIndex) => (
                              <ListItem key={eIndex} dense>
                                <ListItemText
                                  primary={`${evidence.content} - Page ${evidence.page_number}`}
                                />
                              </ListItem>
                            ))}
                          </List>
                        }
                      />
                    )}
                  </Box>
                }
              />
              <Divider />
            </Box>
          ))}
        </Box>
      </Paper>
    </div>
  );
};

export default PriorAuthResponse;
