import { CreateGroupForm } from "../../forms/create-group/create-group";
import { CreateGroupHeader } from "./group/create-group-header";

export function CreateGroupPage() {
  return (
    <div>
      <CreateGroupHeader />
      <CreateGroupForm />
    </div>
  );
}
