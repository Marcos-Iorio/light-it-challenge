import { ButtonProps } from "@/app/types";

const Button = ({
  text,
  action,
  className = "w-full h-10 bg-e-green rounded-full mt-auto font-bold cursor-pointer hover:bg-e-green-hover",
  children,
}: ButtonProps) => {
  return (
    <button type="button" className={className} onClick={action}>
      {children ? children : text}
    </button>
  );
};

export default Button;
