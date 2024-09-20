import { create } from 'zustand';
import { IToDoItem } from '@/Interfaces/TodoCardInterface';

interface Store {
    tasks: IToDoItem[];
    setTasks: (tasks: IToDoItem[]) => void;
    removeTask: (id: number) => void; 
    addTask: (newTask: IToDoItem) => void;
}

const useStore = create<Store>((set) => ({
    tasks: [],
    setTasks: (tasks) => set({ tasks }),
    removeTask: (id) => set((state) => ({
        tasks: state.tasks.filter(task => task.id !== id),
    })),
    addTask: (newTask) => set((state) => ({
        tasks: [...state.tasks, newTask],
    })),
}));

export default useStore;
