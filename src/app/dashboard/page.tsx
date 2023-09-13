"use client";

import { Input } from "@/components/Input";
import { Section } from "@/components/Section";
import { useFetch } from "@/functions/useFetch";
import { ChangeEvent, useState, useCallback } from "react";

interface PeopleNameProps {
  title: string;
  first: string;
  last: string;
}

interface PeopleLocationProps {
  street: {
    number: number;
    name: string;
  };
  city: string;
  state: string;
  country: string;
  postcode: string;
}
interface PeopleProps {
  gender: string;
  name: PeopleNameProps;
  location: PeopleLocationProps;
}
interface Data {
  results: PeopleProps[];
}

const Dashboard = () => {
  const { data, error, isLoading } = useFetch<Data>("https://randomuser.me/api/?results=20");
  console.log(data?.results);

  const peoples: PeopleProps[] | undefined = data?.results;
  console.log(peoples?.forEach((people) => people));

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
          <Input value={goal} type="text" onChange={handleInput} placeholder="Type our Goal!" />
        </div>
      </Section>
      <Section>
        <div>
          {!!error && <span className="text-red-500">{error}</span>}
          {peoples?.map((people, index) => (
            <h1 key={people.name.first} className="text-4xl text-white font-bold">
              {people.name.first}
            </h1>
          ))}
          <button className="py-2 px-4 bg-emerald-500 text-center font-medium">Click Here</button>
        </div>
      </Section>
    </div>
  );
};

export default Dashboard;
