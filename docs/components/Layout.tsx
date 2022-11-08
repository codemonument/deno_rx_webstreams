import { JSX } from "preact";
import { Head } from "$fresh/runtime.ts";

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
      <div class="layout">
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <p class="my-6">
          Welcome to `fresh`. Try updating this message in the
          ./routes/index.tsx file, and refresh.
        </p>
        {props.children}
      </div>
    </>
  );
}
