import "./index.css";
export default function GlobalModal(newProps) {
  const {
    modalStyle,
    handleCloseModal,
    handleCloseUserModal,
    userModalActive,
    searchModalActive,
    handleCloseSearchModal,
    searchModal,
  } = newProps;
  return (
    <div
      className={`cart-modal`}
      style={modalStyle || userModalActive || searchModalActive}
      onClick={
        handleCloseModal || handleCloseUserModal || handleCloseSearchModal
      }
    ></div>
  );
}
