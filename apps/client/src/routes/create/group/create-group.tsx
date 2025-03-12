import { CreateHeader } from "../Header";
import { CreateGroupForm } from "./create-group-form";

export function CreateGroupPage() {
  return (
    <div>
      <CreateHeader title="צור קבוצה חדשה" />
      <CreateGroupForm />
    </div>
  );
}
