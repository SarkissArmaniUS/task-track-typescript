// src/app/components/Input.tsx
type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  status: boolean;
};

export default function Input({ value, onChange, placeholder, type = "text", status}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={status}
      className={`border p-2 block my-2 w-full ${status === true ? 'cursor-not-allowed' : ''}`}
    />
  );
}
