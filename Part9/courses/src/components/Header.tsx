import React from "react";

interface HeaderProps {
  courseName: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  return <h2>{props.courseName}</h2>;
};

export default Header;
