import type { Route } from "./+types/team";

export async function loader({ params }: Route.LoaderArgs) {}

export function AboutPage() {
  return (
    <div>
      <h1>About Page</h1>
    </div>
  );
}
