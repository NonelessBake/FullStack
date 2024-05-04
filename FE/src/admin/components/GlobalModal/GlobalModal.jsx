import "./index.css";

export default function GlobalModal(newProps) {
  const { openModal, setOpenModal } = newProps;
  return (
    <div
      onClick={() => setOpenModal((prev) => !prev)}
      className={`global-modal`}
      style={{ display: `${openModal ? `block` : "none"} ` }}
    >
      GlobalModal
    </div>
  );
}
