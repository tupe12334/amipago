import { Fragment } from "react/jsx-runtime";
import { CreateHeader } from "../Header";
import { CreateGroupForm } from "./create-group-form";

export function CreateGroupPage() {
  return (
    <Fragment>
      <CreateHeader title="צור קבוצה חדשה" />
      <CreateGroupForm />
    </Fragment>
  );
}
