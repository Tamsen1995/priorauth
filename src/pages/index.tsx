import React from "react";
import PriorAuthRecords from "../components/PriorAuthRecords";

const Home: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-bold text-center text-blue-500 my-5">
        Welcome to Co:Helm Prior Authorization Tool
      </h1>{" "}
      <PriorAuthRecords />
    </div>
  );
};

export default Home;
