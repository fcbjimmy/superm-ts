import clsx from "clsx";
import { ReactElement, ReactNode } from "react";

//using Button: Product/Cart/ProductDetailInfo/

interface buttonProps {
  outline?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  children: ReactNode;
  className?: String;
  onClick?: () => void;
}

export default function Button(props: buttonProps) {
  const { children, outline, className, ...rest } = props;

  const classNames = clsx(
    {
      btn: true,
      "btn-default": !outline,
      "btn-outline": outline,
    },
    className
  );

  return (
    <button className={classNames} {...rest}>
      {children}
    </button>
  );
}
