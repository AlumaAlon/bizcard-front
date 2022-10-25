import { FunctionComponent } from "react";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <footer className="bg-dark text-white p-2 text-center m-0 fixed-bottom">
      Copyright &copy; Aluma Alon
    </footer>
  );
};

export default Footer;
