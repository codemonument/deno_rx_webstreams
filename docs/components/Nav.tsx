import { JSX } from "preact";

export function Nav(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <nav>
      <a href="/">Main</a>
      <a href="/concepts">Concepts</a>
      <a href="/examples">Examples</a>
      <a href="/sources">Sources</a>
      <a href="/transforms">Transforms</a>
      <a href="/targets">Targets</a>
    </nav>
  );
}
