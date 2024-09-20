"use client";
import React, { useState } from 'react';
import './styles.scss';
import trashIcon from '@/../public/icons/trash.svg';
import Image from 'next/image';
import useStore from "@/store/useStore";

const TodoCard: React.FC<any> = ({ item }) => {
    const [isCompleted, setIsCompleted] = useState(item.isCompleted);
    const setTasks = useStore((state) => state.setTasks);
    const removeTask = useStore((state) => state.removeTask);
    const tasks = useStore((state) => state.tasks); 

    const handleTaskCompleted = () => {
        const updatedCompleted = !isCompleted;
        setIsCompleted(updatedCompleted);
        updateTask(item.id, updatedCompleted);
    };

    const updateTask = async (id: number, completed: boolean) => {
        try {
            const response = await fetch(`http://localhost:5000/tasks/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isCompleted: completed }), 
            });

            if (!response.ok) {
                throw new Error('Ocorreu um erro ao atualizar a tarefa');
            }

            const updatedTasks = tasks.map((task) =>
                task.id === id ? { ...task, isCompleted: completed } : task
            );
            setTasks(updatedTasks);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveTask = async () => {
        try {
            const response = await fetch(`http://localhost:5000/tasks/${item.id}`, {
                method: 'DELETE', 
            });

            if (!response.ok) {
                throw new Error('Ocorreu um erro ao remover a tarefa');
            }

            removeTask(item.id); 
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="todo-card-item">
            <div>
                <input
                    type="checkbox"
                    className="todo-card-checkbox"
                    checked={isCompleted}
                    onChange={handleTaskCompleted}
                />
                <h2
                    style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}
                    className="todo-card-title"
                >
                    {item.title}
                </h2>
            </div>
            <div onClick={handleRemoveTask} style={{ cursor: 'pointer' }}>
                <Image src={trashIcon} alt="Excluir tarefa" />
            </div>
        </div>
    );
};

export default TodoCard;
