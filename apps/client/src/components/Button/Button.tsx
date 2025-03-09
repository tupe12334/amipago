export type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export function Button(props: Props) {
  <button {...props}></button>;
}
