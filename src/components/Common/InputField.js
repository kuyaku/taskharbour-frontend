const InputField = (props) => {
  return props.type === "submit" ? (
    <div>
      <input
        type="submit"
        className="bg-blue-500 mt-3 text-white p-2 w-full rounded-sm font-semibold text-lg cursor-pointer"
      />
    </div>
  ) : (
    <div className="flex flex-col">
      <label className="text-gray-500 font-semibold">{props.label}</label>
      <input
        className="p-2 bg-gray-100 hover:border-l-4 focus:border-blue-600 outline-none"
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default InputField;
