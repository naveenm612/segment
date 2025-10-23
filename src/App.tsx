import React, { useState,useEffect } from "react";
import "./App.css";
import SegmentCard from "./components/SegmentCard";
import SegmentModal from "./components/SegmentModal";
import AlertModal from "./components/AlertModal";

interface SchemaOption {
  label: string;
  value: string;
} 

interface Segment {
  segment_name: string;
  schema: Record<string, string>;
}

const schemaOptions: SchemaOption[] = [
  { label: "First Name", value: "First Name" },
  { label: "Last Name", value: "Last Name" },
  { label: "Gender", value: "Gender" },
  { label: "Age", value: "Age" },
  { label: "Account Name", value: "Account Name" },
  { label: "City", value: "City" },
  { label: "State", value: "State" },
];

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState<string[]>([]);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [currentSchema, setCurrentSchema] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleSchemaChange = (schema: string) => {
    setCurrentSchema(schema);
    if (schema && !selectedSchemas.includes(schema)) {
      setSelectedSchemas([...selectedSchemas, schema]);
      setFormValues({ ...formValues, [schema]: "" });
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setFormValues({ ...formValues, [key]: value });
  };

  const handleRemoveSchema = (schema: string) => {
    setSelectedSchemas(selectedSchemas.filter((s) => s !== schema));
    const newValues = { ...formValues };
    delete newValues[schema];
    setFormValues(newValues);
  };

  const handleSaveSegment = () => {
    if (!segmentName.trim()) {
      setAlertMessage("⚠️ Please enter a segment name!");
      setShowAlert(true);
      return;
    }

    const newSegment: Segment = { segment_name: segmentName, schema: formValues };

    if (editIndex !== null) {
      const updatedSegments = [...segments];
      updatedSegments[editIndex] = newSegment;
      setSegments(updatedSegments);
      setEditIndex(null);
    } else {
      setSegments([...segments, newSegment]);
    }

    setShowModal(false);
    setSegmentName("");
    setSelectedSchemas([]);
    setFormValues({});
    setCurrentSchema("");
  };

  const handleEditSegment = (index: number) => {
    const seg = segments[index];
    setSegmentName(seg.segment_name);
    setFormValues(seg.schema);
    setSelectedSchemas(Object.keys(seg.schema));
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDeleteSegment = (index: number) => {
    setDeleteIndex(index);
    setAlertMessage("Are you sure you want to delete this segment?");
    setShowAlert(true);
  };

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      setSegments(segments.filter((_, i) => i !== deleteIndex));
      setDeleteIndex(null);
    }
    setShowAlert(false);
  };
 useEffect(() => {
    const savedSegments = localStorage.getItem("segments");
    if (savedSegments) {
      setSegments(JSON.parse(savedSegments));
    }
  }, []);

  // Save segments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("segments", JSON.stringify(segments));
  }, [segments]);
  const availableOptions = schemaOptions.filter((opt) => !selectedSchemas.includes(opt.value));

  return (
    <div className="App">
      <h1 className="heading">Audience Segments</h1>
      <button className="save-btn" onClick={() => setShowModal(true)}>Save segment</button>

      <div className="segments-container">
        {segments.length > 0 ? (
          segments.map((seg, index) => (
            <SegmentCard
              key={index}
              segment={seg}
              onEdit={() => handleEditSegment(index)}
              onDelete={() => handleDeleteSegment(index)}
            />
          ))
        ) : (
          <p className="no-data">No segments saved yet.</p>
        )}
      </div>

      <SegmentModal
        show={showModal}
        segmentName={segmentName}
        setSegmentName={setSegmentName}
        selectedSchemas={selectedSchemas}
        availableOptions={availableOptions}
        formValues={formValues}
        currentSchema={currentSchema}
        handleSchemaChange={handleSchemaChange}
        handleInputChange={handleInputChange}
        handleRemoveSchema={handleRemoveSchema}
        handleSaveSegment={handleSaveSegment}
        handleClose={() => { setShowModal(false); setEditIndex(null); }}
        editMode={editIndex !== null}
      />

      <AlertModal
        show={showAlert}
        message={alertMessage}
        onClose={() => { setShowAlert(false); setDeleteIndex(null); }}
        onConfirm={confirmDelete}
        isDelete={deleteIndex !== null}
      />
    </div>
  );
};

export default App;
