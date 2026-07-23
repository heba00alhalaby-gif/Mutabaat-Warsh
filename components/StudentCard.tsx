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
  const statusColor =
    status === "حضرت"
      ? "#2e7d32"
      : status === "اعتذر عن الحضور"
      ? "#ef6c00"
      : "#777";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px 20px",
        margin: "10px 0",
      }}
    >
      <div style={{ width: "220px", fontWeight: "bold" }}>
        {name}
      </div>

      <div
        style={{
          width: "180px",
          textAlign: "center",
          color: statusColor,
          fontWeight: "bold",
        }}
      >
        {status || "لم تُسجل بعد"}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={onPresent}
          style={{
            background: "#2e7d32",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 18px",
            cursor: "pointer",
          }}
        >
          حضرت
        </button>

        <button
          onClick={onAbsent}
          style={{
            background: "#ef6c00",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 18px",
            cursor: "pointer",
          }}
        >
          اعتذرت
        </button>
      </div>
    </div>
  );
}