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
              className={`rounded-full h-8 w-8 flex items-center justify-center text-white ${
                step.is_met ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {index + 1}
            </div>
            {index < data.steps.length - 1 && (
              <div className="flex items-center">
                <div className="flex-auto border-t border-gray-300"></div>
                <svg
                  className="w-6 h-6 fill-current text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M1 10l9 9 9-9-9-9-9 9zm12-8l7 8-7 8V2z" />
                </svg>
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
        <Typography variant="h4" gutterBottom>
          Procedure: {data.procedure_name}
        </Typography>
        <Typography variant="body1">
          <strong>Case ID:</strong> {data.case_id}
        </Typography>
        <Typography variant="body1">
          <strong>Status:</strong> {data.status}
        </Typography>
        <Typography variant="body1">
          <strong>CPT Codes:</strong> {data.cpt_codes.join(", ")}
        </Typography>
        {renderStepsFlowIndicator()}
        <Typography
          variant="h6"
          sx={{ color: data.is_met ? green[500] : red[500] }}
        >
          Determination: {data.is_met ? "Approved" : "Denied"}
        </Typography>
        <Typography variant="body1">
          <strong>Summary:</strong> {data.summary}
        </Typography>
        <Box mt={2}>
          <Typography variant="h5" gutterBottom>
            Steps:
          </Typography>
          {data.steps.map((step, index) => (
            <Box mb={2}>
              <Collapsible
                key={step.key}
                title={`Step ${index + 1}: ${step.question}`}
                content={
                  <Box>
                    <Typography variant="body1">{step.reasoning}</Typography>
                    <List>
                      {step.options.map((option) => (
                        <ListItem key={option.key} dense>
                          <Checkbox checked={option.selected} readOnly />
                          <ListItemText primary={option.text} />
                        </ListItem>
                      ))}
                    </List>
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
