import React from "react";
import MomiceLogo from "../components/MomiceLogo";
import { Link } from "react-router-dom";

const styles = {
  nav: {
    padding: "10px",
    boxShadow: "0 2px 5px lightgrey",
    display: "flex"
  }
};
export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/">
        <MomiceLogo />
      </Link>
      <div></div>
    </nav>
  );
}
