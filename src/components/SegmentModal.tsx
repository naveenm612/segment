import React from "react";

interface SegmentModalProps {
  show: boolean;
  segmentName: string;
  setSegmentName: (name: string) => void;
  selectedSchemas: string[];
  availableOptions: { label: string; value: string }[];
  formValues: Record<string, string>;
  currentSchema: string;
  handleSchemaChange: (schema: string) => void;
  handleInputChange: (key: string, value: string) => void;
  handleRemoveSchema: (schema: string) => void;
  handleSaveSegment: () => void;
  handleClose: () => void;
  editMode: boolean;
}

// Fields that should only accept numbers
const numericFields = ["Age", "Account Name"];

const SegmentModal: React.FC<SegmentModalProps> = ({
  show,
  segmentName,
  setSegmentName,
  selectedSchemas,
  availableOptions,
  formValues,
  currentSchema,
  handleSchemaChange,
  handleInputChange,
  handleRemoveSchema,
  handleSaveSegment,
  handleClose,
  editMode,
}) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-header">{editMode ? "Edit Segment" : "Saving Segment"}</h2>

        <div className="modal-content">
          <label>Enter the Name of the Segment</label>
          <input
            type="text"
            placeholder="Name of the segment"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
          />

          <p className="desc">To save your segment, add schemas to build the query</p>

          <div className="schema-box">
            {selectedSchemas.map((schema) => {
              const label = availableOptions.find((opt) => opt.value === schema)?.label || schema;
              const isNumeric = numericFields.includes(schema);

              return (
                <div key={schema} className="schema-item">
                  <label>{label}</label>
                  <input
                    type={isNumeric ? "number" : "text"} // number type for Age/Account Name
                    placeholder={`Enter ${label}`}
                    value={formValues[schema] || ""}
                    onChange={(e) => handleInputChange(schema, e.target.value)}
                  />
                  <button className="remove-btn" onClick={() => handleRemoveSchema(schema)}>
                    -
                  </button>
                </div>
              );
            })}

            <div className="add-schema-row">
              <select value={currentSchema} onChange={(e) => handleSchemaChange(e.target.value)}>
                <option value="">Add schema to segment</option>
                {availableOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="save-segment-btn" onClick={handleSaveSegment}>
            {editMode ? "Update Segment" : "Save the Segment"}
          </button>
          <button className="cancel-btn" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SegmentModal;
