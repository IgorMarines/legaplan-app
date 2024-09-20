"use client";
import React, { useState } from 'react';
import './styles.scss';
import trashIcon from '@/../public/icons/trash.svg';
import Image from 'next/image';
import useStore from "@/store/useStore";

import { Modal } from '@/components/Modal/Modal';
import { Button } from '@/components/Button/Button';

const TodoCard: React.FC<any> = ({ item }) => {
    const [isCompleted, setIsCompleted] = useState(item.isCompleted);
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a abertura do modal
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
            setIsModalOpen(false); // Fechar o modal após a remoção
        } catch (error) {
            console.error(error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="todo-task-card">
            <div className="todo-task-info">
                <input
                    type="checkbox"
                    className="todo-task-checkbox"
                    checked={isCompleted}
                    onChange={handleTaskCompleted}
                />
                <h2
                    style={{ textDecoration: isCompleted ? 'line-through' : 'none', color: isCompleted ? '#0000008A' : '#000' }}
                    className="todo-task-title"
                >
                    {item.title}
                </h2>
            </div>
            <div className="todo-task-delete" onClick={openModal} style={{ cursor: 'pointer' }}>
                <Image src={trashIcon} alt="Excluir tarefa" />
            </div>

            <Modal
                title="Deletar tarefa"
                isOpen={isModalOpen}
                onClose={closeModal}
            >
                <p style={{color: "#0000008A", marginTop: 32}}>Tem certeza que você deseja deletar essa tarefa?</p>

                <div className='buttons-container'>
                    <Button text="Cancelar" variant="default" action={closeModal} width={186} />
                    <Button text="Deletar" variant="danger" action={handleRemoveTask} width={186} />
                </div>
            </Modal>
        </div>
    );
};

export default TodoCard;
