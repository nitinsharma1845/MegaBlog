const Button = ({
  Children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-gray-200",
  clasName = "",
  ...props
}) => {
  return <button
  className={`px-4 py-2 rounded-lg ${clasName} ${bgColor} ${textColor}`} 
  {...props}
  >{Children}</button>;
};

export default Button;
