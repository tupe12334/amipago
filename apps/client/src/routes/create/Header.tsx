import { BackButton } from "../../components/BackButton/BackButton";
import { TopBar } from "../../components/TopBar/TopBar";

type Props = {
  title: string;
};

export const CreateHeader = ({ title }: Props) => {
  return (
    <TopBar className="items-center gap-x-3 px-4 shadow-sm">
      <BackButton />
      <h1>{title}</h1>
    </TopBar>
  );
};
