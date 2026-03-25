import { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

const Input = ({ label, error, hint, id, ...props }: InputProps) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        className={`form-control ${error ? "is-invalid" : ""}`}
        {...props}
      />
      {error && (
        <div className="invalid-feedback">{error}</div>
      )}
      {hint && !error && (
        <div className="form-text">{hint}</div>
      )}
    </div>
  );
};

export default Input;