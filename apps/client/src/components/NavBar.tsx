import { TopBar } from "./TopBar/TopBar";

function NavBar() {
  return (
    <TopBar>
      <nav className="flex w-full flex-row justify-between">
        <span>AmiPago</span>
        <span>icon</span>
      </nav>
    </TopBar>
  );
}

export default NavBar;
