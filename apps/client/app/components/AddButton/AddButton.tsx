import { FloatingActionButton } from "../FloatingActionButton/FloatingActionButton";
import { useNavigate } from "react-router-dom";
import { createExpensePath, createGroupPath } from "../../paths";

export function AddButton() {
  const navigate = useNavigate();

  return (
    <FloatingActionButton
      options={[
        {
          label: "צור קבוצה",
          icon: (
            <i
              className="fa fa-users"
              aria-hidden="true"
              id="add-btn-group-icon"
            ></i>
          ),
          onClick: () => navigate(createGroupPath),
        },
        {
          label: "הוצאה חדשה",
          icon: (
            <i
              className="fa fa-money"
              aria-hidden="true"
              id="add-btn-expense-icon"
            ></i>
          ),
          onClick: () => navigate(createExpensePath),
        },
      ]}
    >
      <i className="fa fa-plus" aria-hidden="true" id="add-btn-main-icon"></i>
    </FloatingActionButton>
  );
}
