import { FaPlus } from "react-icons/fa6";
import FloatingActionButton from "../FloatingActionButton/FloatingActionButton";
import { FaUserGroup } from "react-icons/fa6";
import { FaMoneyBillTransfer } from "react-icons/fa6";

export function AddButton() {
  return (
    <FloatingActionButton
      options={[
        {
          label: "צור קבוצה",
          icon: <FaUserGroup />,
          onClick: () => console.log("Create Group"),
        },
        {
          label: "הוצאה חדשה",
          icon: <FaMoneyBillTransfer />,
          onClick: () => console.log("Create Expense"),
        },
      ]}
    >
      <FaPlus />
    </FloatingActionButton>
  );
}
