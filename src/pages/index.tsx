import type { NextPage } from "next";
import { Sample } from "@component/Sample";

const Home: NextPage = () => {
  return (
    <div className="p-20">
      <h1>Hello Next.js 👋</h1>
      <Sample child="Hello Child" />
    </div>
  );
};

export default Home;
