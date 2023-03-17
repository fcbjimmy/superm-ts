import clsx from "clsx";

interface inputProps {
  className?: string;
  placeholder: string;
  required: boolean;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: inputProps) {
  const { className, placeholder, required, type = "text", ...rest } = props;

  const classNames = clsx({ input: true }, className);

  return (
    <label className="label">
      {placeholder}
      {required && <span className="input-required">*</span>}
      <div>
        <input
          type={type}
          placeholder={placeholder}
          className={classNames}
          required={required}
          {...rest}
        />
      </div>
    </label>
  );
}
