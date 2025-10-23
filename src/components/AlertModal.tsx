import React from "react";

interface AlertModalProps {
  show: boolean;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  isDelete?: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({ show, message, onClose, onConfirm, isDelete }) => {
  if (!show) return null;

  return (
    <div className="modalalert-overlay">
      <div className="alert-modal">
        <p>{message}</p>
        <div className="alert-actions">
          {isDelete ? (
            <>
              <button className="confirm-btn" onClick={onConfirm}>
                Yes
              </button>
              <button className="cancel-btn" onClick={onClose}>
                No
              </button>
            </>
          ) : (
            <button className="ok-btn" onClick={onClose}>
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
