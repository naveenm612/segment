import React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";

interface SegmentCardProps {
  segment: {
    segment_name: string;
    schema: Record<string, string>;
  };
  onEdit: () => void;
  onDelete: () => void;
}

const SegmentCard: React.FC<SegmentCardProps> = ({ segment, onEdit, onDelete }) => {
  return (
    <div className="segment-card">
      <div className="segment-header">
        <h3>{segment.segment_name}</h3>
        <div className="icons">
          <Tooltip title="Edit" placement="top">
          <IconButton color="primary" onClick={onEdit}>
            <EditIcon />
          </IconButton>
          </Tooltip>
          <Tooltip title="Delete" placement="top">
          <IconButton color="error" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
          </Tooltip>
        </div>
      </div>

      <div className="segment-data">
        {Object.entries(segment.schema).map(([key, value]) => (
          <div key={key} className="data-box">
            <div className="data-key">{key}</div>
            <div className="data-value">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SegmentCard;
