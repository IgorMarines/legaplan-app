import React, { useState } from 'react';
import TaskCard from './TaskCard/TaskCard';
import { IToDoCard, IToDoItem } from '@/Interfaces/TodoCardInterface';
import './styles.scss';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { Input } from '../Input/Input';
import useStore from '@/store/useStore'; 

const ToDoCard: React.FC<IToDoCard> = ({ items }) => {
    const pendingItems = items.filter((item: IToDoItem) => !item.isCompleted);
    const completedItems = items.filter((item: IToDoItem) => item.isCompleted);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const setTasks = useStore((state) => state.setTasks);
    const tasks = useStore((state) => state.tasks);

    const handleAddTask = async () => {
        if (newTaskTitle.trim() !== '') {
            const newTask = {
                title: newTaskTitle,
                isCompleted: false,
            };

            try {
                const response = await fetch('http://localhost:5000/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newTask),
                });

                if (!response.ok) {
                    throw new Error('Erro ao adicionar a nova tarefa');
                }

                const createdTask: IToDoItem = await response.json();

                setTasks([...tasks, createdTask]);
                setNewTaskTitle('');
                setIsModalOpen(false);
            } catch (error) {
                console.error('Erro ao adicionar a tarefa:', error);
            }
        }
    };

    return (
        <div>
            <Modal
                title="Nova tarefa"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <div style={{ marginTop: 36 }}>
                    <Input
                        label="Título"
                        labelClassName='labelStyle'
                        className='inputStyle'
                        placeholder='Digite'
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            width={186}
                            margin='24px 0'
                            text="Cancelar"
                            action={() => setIsModalOpen(false)}
                            variant="default"
                        />
                        <Button
                            width={186}
                            margin='24px 0'
                            text="Adicionar"
                            action={handleAddTask}
                            variant="create"
                        />
                    </div>
                </div>
            </Modal>

            <div className="todo-card">
                <h6>Suas tarefas de hoje</h6>
                <div className="todo-items" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {pendingItems.length ? (
                        pendingItems.map((item: IToDoItem) => (
                            <div key={item.id}>
                                <TaskCard item={item} />
                            </div>
                        ))
                    ) : (
                        <p>Sem tarefas pendentes</p>
                    )}
                </div>

                <h6>Tarefas finalizadas</h6>
                <div className="todo-items" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {completedItems.length ? (
                        completedItems.map((item: IToDoItem) => (
                            <TaskCard item={item} key={item.id} />
                        ))
                    ) : (
                        <p>Sem tarefas finalizadas</p>
                    )}
                </div>
            </div>

            <Button
                margin='24px 0'
                text="Adicionar nova tarefa"
                action={() => setIsModalOpen(true)}
                variant="create"
            />
        </div>
    );
};

export default ToDoCard;
