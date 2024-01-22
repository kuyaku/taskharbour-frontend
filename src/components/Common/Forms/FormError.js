const FormError = (props) => {
  return (
    <div>
      <p className="text-red-600 text-sm -mt-3">{props.message}</p>
    </div>
  );
};

export default FormError;
