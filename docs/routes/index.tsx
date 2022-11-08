import { Layout } from "../components/Layout.tsx";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  return (
    <Layout>
      <Counter start={3} />
    </Layout>
  );
}
