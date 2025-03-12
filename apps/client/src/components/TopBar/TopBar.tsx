import classNames from "classnames";
import React, { FC } from "react";

type Props = React.PropsWithChildren & {
  className?: string;
};
export const TopBar: FC<Props> = ({ children, className }) => {
  return (
    <div
      id="topbar-container"
      className={classNames("flex w-full px-2 py-3", className)}
    >
      {children}
    </div>
  );
};
