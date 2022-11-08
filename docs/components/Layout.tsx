import { JSX } from "preact";
import { Head } from "$fresh/runtime.ts";
import { Nav } from "./nav.tsx";

export function Layout(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <>
      <Head>
        <title>Docs rx_webstreams</title>
        <link rel="stylesheet" href="./open-props@1.4.16/open-props.min.css" />
        <link rel="stylesheet" href="./open-props@1.4.16/normalize.min.css" />
        <link rel="stylesheet" href="./open-props@1.4.16/buttons.min.css" />
        <link rel="stylesheet" href="./global.css"></link>
      </Head>

      <Nav></Nav>

      <main>
        {props.children}
      </main>
    </>
  );
}