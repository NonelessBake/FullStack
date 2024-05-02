/* eslint-disable react/prop-types */
import Modal from "react-modal";
import "./index.css";

export default function Popup({ isOpen, onClose }) {
  return (
    <div className="modal-popup">
      <Modal
        ariaHideApp={false}
        isOpen={isOpen}
        onRequestClose={onClose}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 10,
            overflow: "hidden",
          },
          content: {
            height: "fit-content",
            width: "50vw",
            margin: "0 auto",
            borderRadius: 15,
          },
        }}
      >
        <div className="popup-container"></div>
      </Modal>
    </div>
  );
}
