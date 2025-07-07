import React from "react";
import { ImAddressBook } from "react-icons/im";

const Header = () => {
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <span className="navbar-brand fs-3">
            <ImAddressBook className="text-primary fs-1 mx-3" />
            Users
          </span>
        </div>
      </nav>
    </>
  );
}

export default Header;
