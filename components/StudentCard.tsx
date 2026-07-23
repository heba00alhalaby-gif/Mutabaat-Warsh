type StudentCardProps = {
  name: string;
  status: string;
  onPresent: () => void;
  onAbsent: () => void;
};

export default function StudentCard({
  name,
  status,
  onPresent,
  onAbsent,
}: StudentCardProps) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        margin: "10px 0",
      }}
    >
      <h3>{name}</h3>

      <button onClick={onPresent}>
        ✅ حضرت
      </button>

      <button
        onClick={onAbsent}
        style={{ marginRight: "10px" }}
      >
        🌿 اعتذر عن الحضور
      </button>
    </div>
  );
}