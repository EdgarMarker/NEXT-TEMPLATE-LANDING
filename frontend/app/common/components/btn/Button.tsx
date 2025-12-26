import "./button.css";
import React from "react";
type ButtonProps =
  | {
      variant: "link";
      href: string;
      target?: string;
      children: React.ReactNode;
      className?: string;
    }
  | {
      variant: "scroll";
      onClick?: () => void;
      children: React.ReactNode;
      className?: string;
    }
  | {
      variant: "button";
      onClick?: () => void;
      children: React.ReactNode;
      className?: string;
    };

const Button: React.FC<ButtonProps> = (props) => {
  switch (props.variant) {
    case "link":
      return (
        <a
          href={props.href}
          target={props.target}
          rel={props.target === "_blank" ? "noopener noreferrer" : undefined}
          className={`btn btn__link--${props.className || "primary"}`}
        >
          {props.children}
        </a>
      );
    case "scroll":
      return (
        <a href="#" onClick={props.onClick}>
          {props.children}
        </a>
      );
    case "button":
    default:
      return (
        <button type="button" onClick={props.onClick}>
          {props.children}
        </button>
      );
  }
};

export default Button;
