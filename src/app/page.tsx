"use client";

import Header from "@/components/Header/Header";
import Main from "@/components/Main/Main";
import ToDoCard from "@/components/ToDoCard/TodoCard";
import { IToDoItem, ITask } from "@/Interfaces/TodoCardInterface";
import { useEffect } from "react";
import useStore from "@/store/useStore";

export default function Home() {
  const setTasks = useStore((state) => state.setTasks);

  const getTasks = async (): Promise<IToDoItem[]> => {
    const response = await fetch('http://localhost:5000/tasks');
    const data: IToDoItem[] = await response.json();
    return data.map(item => ({
      ...item,
      isCompleted: item.isCompleted ?? false,
    }));
  }


  useEffect(() => {
    const fetchTasks = async () => {
      const tasksFromServer = await getTasks();
      setTasks(tasksFromServer as ITask[]);
    };

    fetchTasks();
  }, [setTasks]);

  const tasks = useStore((state) => state.tasks);

  return (
    <div>
      <Header />
      <Main>
        <ToDoCard items={tasks} />
      </Main>
    </div>
  );
}
