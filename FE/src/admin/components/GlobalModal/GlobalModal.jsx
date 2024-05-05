import "./index.css";

export default function GlobalModal(newProps) {
  const { openModal, setOpenModal } = newProps;
  const onCloseModal = () => {
    setOpenModal((prev) => !prev);
  };
  return (
    <div
      onClick={onCloseModal}
      className={`global-modal`}
      style={{ display: `${openModal ? `block` : "none"} ` }}
    ></div>
  );
}
