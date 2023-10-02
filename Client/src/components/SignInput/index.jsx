function SignInput({
  setValue,
  value,
  placeholder,
  label,
  type = "text",
  required,
}) {
  return (
    <div className="my-4 flex flex-col">
      <label>{label}</label>
      <input
        required={required || false}
        className="border-2 p-4"
        type={type}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </div>
  );
}

export default SignInput;
