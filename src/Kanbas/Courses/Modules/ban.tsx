import { FaBan } from "react-icons/fa";

export default function BanMark() {
  return (
    <span className="me-1 position-relative">
      <FaBan className="text-danger fs-5" style={{ top: "2px" }} />
    </span>
  );
}
