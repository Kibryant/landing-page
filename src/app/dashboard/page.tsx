"use client";

import { Input } from "@/components/Input";
import { Section } from "@/components/Section";
import { ChangeEvent, useState, useCallback } from "react";

const Dashboard = () => {
  const [goal, setGoal] = useState("");
  const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setGoal(e.target.value);
  }, []);
  return (
    <div>
      <h1 className="text-white text-xl">Oie!!!!</h1>
      <Section>
        <div className="flex flex-col">
          <h2 className="text-white text-xl mb-2">{goal}</h2>
          <Input
            value={goal}
            type="text"
            onChange={handleInput}
            placeholder="Type our Goal!"
          />
        </div>
      </Section>
    </div>
  );
};

export default Dashboard;
