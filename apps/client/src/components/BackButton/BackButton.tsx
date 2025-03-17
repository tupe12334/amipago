import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";

type Props = Omit<
  React.ComponentProps<typeof IconButton>,
  "aria-label" | "children"
>;

export function BackButton(props: Props) {
  const navigate = useNavigate();
  const buttonId = "back-button";

  return (
    <IconButton
      id={buttonId}
      {...props}
      aria-label="Back"
      onClick={(e) => {
        props.onClick?.(e);
        navigate(-1);
      }}
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
        },
        "&:active": {
          transform: "scale(0.95)",
        },
      }}
    >
      <i
        className="fa fa-arrow-right"
        aria-hidden="true"
        id={`${buttonId}-icon`}
      ></i>
    </IconButton>
  );
}
