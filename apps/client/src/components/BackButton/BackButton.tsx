import { useNavigate } from "react-router";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function BackButton(props: Props) {
  const navigate = useNavigate();
  const buttonId = "back-button";

  return (
    <button
      id={buttonId}
      {...props}
      className="h-full flex items-center justify-center active:scale-95 focus:outline-none focus:ring-2 transition-all duration-300 transform hover:scale-105"
      aria-label="Back"
      onClick={(e) => {
        props.onClick && props.onClick(e);
        navigate(-1);
      }}
    >
      <i
        className="fa fa-arrow-right text-4xl"
        aria-hidden="true"
        id={`${buttonId}-icon`}
      ></i>
    </button>
  );
}
