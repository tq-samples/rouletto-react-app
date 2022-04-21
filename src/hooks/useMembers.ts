import { useEffect, useState } from "react";

export type PersonData = {
  option: string;
};
export const useMembers = () => {
  const [members, setMembers] = useState<PersonData[]>(() => {
    const saved = localStorage.getItem("personList");
    const initialValue = JSON.parse(saved || "[]");
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem("personList", JSON.stringify(members));
  }, [members]);

  const addMember = (member: PersonData) => setMembers([...members, member]);

  const deleteMember = (index: number) => {
    const newMembers = [...members];
    newMembers.splice(index, 1);
    setMembers(newMembers);
  };

  return [members, { setMembers, addMember, deleteMember }] as const;
};
