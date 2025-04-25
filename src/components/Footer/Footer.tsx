import React from "react";

// Components
import Button from "../Button/Button.tsx";

// Styles
import "./Footer.scss";
import { CompassRose } from "@phosphor-icons/react";

interface FooterProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function Footer ({ setShowModal }: FooterProps) {
  return (
    <footer className="footer">
      <p className="footer__text">&copy; InStock Inc. All Rights Reserved.</p>
      <Button label="Play Again"
              btnType="button"
              icon={<CompassRose className="footer__icon--start-game" weight="duotone" size="20"/>}
              className="btn--secondary"
              handleClick={() => setShowModal(true)}/>
    </footer>
  );
}

export default Footer;
