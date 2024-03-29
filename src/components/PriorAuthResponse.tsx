import React, { useState, FC, ReactNode } from "react";
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
import Chip from "@mui/material/Chip";
import {
  Cloud,
  CloudUpload,
  CloudUploadOutlined,
  ExpandLess,
} from "@mui/icons-material";

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
        startIcon={isOpen ? <ExpandLess /> : <ExpandMoreIcon />}
        fullWidth
        variant="outlined"
        aria-expanded={isOpen}
      >
        {title}
      </Button>
      <Collapse in={isOpen}>
        <Paper elevation={1}>
          <Box className="p-2">{content}</Box>
        </Paper>
      </Collapse>
    </Box>
  );
};

const InfoItem: FC<{ label: string; value: string | string[] | ReactNode }> = ({
  label,
  value,
}) => (
  <div className="text-base p-5">
    <strong>{label}:</strong> {Array.isArray(value) ? value.join(", ") : value}
  </div>
);

const StepFlowIndicator: FC<{ steps: Step[]; className: string }> = ({
  steps,
  className,
}) => (
  <div className={className}>
    {steps.map((step, index) => (
      <div key={index} className="flex items-center mr-4">
        <div
          className={`rounded-full h-6 w-6 flex items-center justify-center text-white ${
            step.is_met ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {index + 1}
        </div>
        {index < steps.length - 1 && (
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

const PriorAuthResponse: FC<{ data: PriorAuthData }> = ({ data }) => {
  return (
    <div>
      <Paper elevation={3} className="m-5 p-10">
        <InfoItem label="Procedure" value={data.procedure_name} />
        <InfoItem label="Case ID" value={data.case_id} />
        <InfoItem label="Status" value={data.status} />
        <div className="pl-5 ">
          <span className="pr-5 text-base">
            <strong>CPT Codes:</strong>
          </span>
          {data.cpt_codes.map((code) => (
            <Chip
              key={code}
              label={`${code}`}
              variant="filled"
              className="mr-4 bg-gray-200"
            />
          ))}
        </div>

        <StepFlowIndicator
          steps={data.steps}
          className="flex items-center mb-6 overflow-x-auto pt-5 pl-5"
        />
        <div
          className={`text-lg ${
            data.is_met ? "text-green-500" : "text-red-500"
          } p-5`}
        >
          Determination: {data.is_met ? "Approved" : "Denied"}
        </div>
        <div className="text-base px-5">
          <span className="pr-5">
            <strong>Summary:</strong>
          </span>
          <span>{data.summary}</span>
        </div>
        <div className="p-5">
          <Box mt={2}>
            <div className="text-xl mb-2">Steps:</div>
            {data.steps.map((step, index) => (
              <Box mb={2}>
                <Collapsible
                  className={`border-2 border-blue-100 rounded-lg shadow-md ${
                    step.is_met ? "bg-green-100" : "bg-red-100"
                  }`}
                  key={step.key}
                  title={`Step ${index + 1}: ${step.question}`}
                  content={
                    <Box>
                      {/* reasoning is formatted according to newlines */}

                      <Collapsible
                        className="bg-green-100"
                        title="Selected Options"
                        content={
                          <div className="bg-green-100">
                            <ul className="pb-5 pt-5">
                              {step.options.map((option) => (
                                <li
                                  key={option.key}
                                  className="flex items-center pl-5 pb-4"
                                >
                                  <Checkbox
                                    className="h-6 w-6 text-blue-600"
                                    checked={option.selected}
                                    disabled
                                  />
                                  <p className="text-gray-700 pl-2">
                                    {option.text}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        }
                      />

                      <div className="text-base p-5">
                        {step.reasoning.split("\n").map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                      </div>

                      {step.evidence && step.evidence.length > 0 && (
                        <Collapsible
                          title="Evidence"
                          content={
                            <List className="bg-gray-100 rounded-lg">
                              {step.evidence.map((evidence, eIndex) => (
                                <ListItem className="pb-4" key={eIndex} dense>
                                  <Chip
                                    label={`Page ${evidence.page_number}`}
                                    variant="filled"
                                    className="mr-4 bg-blue-200"
                                  />
                                  <ListItemText
                                    primary={`${evidence.content}`}
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
        </div>
      </Paper>
    </div>
  );
};

export default PriorAuthResponse;
