const TextField = (props) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={"textarea-form font-bold"}>Description</label>
      <textarea
        id="textarea-form"
        className="h-20 p-2 text-black outline-none rounded-sm"
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  );
};

export default TextField;
