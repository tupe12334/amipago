import { FaPlus } from "react-icons/fa6";
import FloatingActionButton from "../FloatingActionButton/FloatingActionButton";
import { FaUserGroup } from "react-icons/fa6";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { createExpensePath, createGroupPath } from "../../paths";

export function AddButton() {
  const navigate = useNavigate();

  return (
    <FloatingActionButton
      options={[
        {
          label: "צור קבוצה",
          icon: <FaUserGroup />,
          onClick: () => navigate(createGroupPath),
        },
        {
          label: "הוצאה חדשה",
          icon: <FaMoneyBillTransfer />,
          onClick: () => navigate(createExpensePath),
        },
      ]}
    >
      <FaPlus />
    </FloatingActionButton>
  );
}
