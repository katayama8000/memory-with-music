import type { NextPage } from "next";
import { Sample } from "@component/Sample";

const Home: NextPage = () => {
  return (
    <div className="p-20">
      <h1 className="text-center italic hover:not-italic">memory with music</h1>
      <Sample child="Hello Child" />
    </div>
  );
};

export default Home;
