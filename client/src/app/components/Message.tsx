type MessageProps = {
  message: string;
  type?: "success" | "error" | "info";
};

export const Message = ({ message, type = "info" }: MessageProps) => {
  const base = "p-2 rounded text-sm mt-2";
  const colors = {
    success: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
  };

  return (
    <div className={`${base} ${colors[type]}`}>
      <p>{message}</p>
    </div>
  );
};
