import { BackButton } from "../../components/BackButton/BackButton";
import { TopBar } from "../../components/TopBar/TopBar";

export function CreateGroupPage() {
  return (
    <div>
      <div>
        <TopBar className="items-center gap-x-2">
          <BackButton />
          <h1>Create Group Page</h1>
        </TopBar>
      </div>
    </div>
  );
}
