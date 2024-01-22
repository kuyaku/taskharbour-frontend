const InputField = (props) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={"input-field font-bold"}>Name</label>
      <input
        className="p-2 text-black bg-white dark:bg-gray-100 rounded-sm outline-none"
        id="input-field"
        type="text"
        placeholder={props.placeholder}
        onChange={props.onChange}
        required={true}
        autoFocus
      />
    </div>
  );
};

export default InputField;
