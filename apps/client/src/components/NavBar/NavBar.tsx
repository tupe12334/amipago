import { TopBar } from "../TopBar/TopBar";
import { UserButton } from "./UserButton";

function NavBar() {
  return (
    <TopBar>
      <nav id="navbar" className="flex w-full flex-row justify-between ">
        <h1 id="navbar-title" className="text-3xl">
          AmiPago
        </h1>
        <UserButton />
      </nav>
    </TopBar>
  );
}

export default NavBar;
