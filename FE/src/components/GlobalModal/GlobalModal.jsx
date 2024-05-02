import "./index.css";
export default function GlobalModal(newProps) {
  const {
    modalStyle,
    handleCloseModal,
    handleCloseUserModal,
    userModalActive,
  } = newProps;

  return (
    <div
      className="cart-modal"
      style={modalStyle || userModalActive}
      onClick={handleCloseModal || handleCloseUserModal}
    >
      <div className="modal-content" onClick={handleCloseModal}></div>
    </div>
  );
}
