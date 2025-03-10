import { BackButton } from "../../components/BackButton/BackButton";
import { TopBar } from "../../components/TopBar/TopBar";

export function CreateGroupPage() {
  return (
    <div>
      <div>
        <TopBar className="items-center gap-x-3 px-4">
          <BackButton />
          <h1>צור קבוצה חדשה</h1>
        </TopBar>
      </div>
    </div>
  );
}
