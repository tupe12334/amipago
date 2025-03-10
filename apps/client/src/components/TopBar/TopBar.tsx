import React, { FC } from "react";

type Props = React.PropsWithChildren;
export const TopBar: FC<Props> = ({ children }) => {
  return <div className="flex w-full px-2 py-3">{children}</div>;
};
