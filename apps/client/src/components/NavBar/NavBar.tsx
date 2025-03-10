import { TopBar } from "../TopBar/TopBar";
import { UserButton } from "./UserButton";

function NavBar() {
  return (
    <TopBar>
      <nav className="flex w-full flex-row justify-between ">
        <h1 className="text-3xl">AmiPago</h1>
        <UserButton />
      </nav>
    </TopBar>
  );
}

export default NavBar;
