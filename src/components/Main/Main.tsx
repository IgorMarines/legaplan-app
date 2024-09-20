"use client";

import './styles.scss';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import { useState } from 'react';

export default function Main({ children }: Readonly<{ children: React.ReactNode }>) {

    const [isModalOpen, setIsModalOpen] = useState(true);

    const getAcceptedWarnFromLocalStorage = () => {
        return localStorage.getItem('acceptedWarn');
    }

    const setAcceptedWarnToLocalStorage = () => {
        localStorage.setItem('acceptedWarn', 'true');
    }

    const userReadWarn = getAcceptedWarnFromLocalStorage();

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text.toLowerCase()).then(() => {
            alert('Texto copiado para a área de transferência');
        }).catch(() => {
            alert('Erro ao copiar texto');
        });
    }



    return (
        <div className='container'>

            {!userReadWarn && isModalOpen &&
                <Modal
                    title='Aviso'
                    isOpen={isModalOpen}
                    onClose={() => { }}
                >
                    <p style={{ padding: '16px 0' }}>
                        Para iniciar o servidor e criar tarefas, execute o comando <code style={{ color: 'white', background: "gray", padding: '3px', cursor: 'pointer' }} onClick={() => copyToClipboard('NPM RUN SERVER')}>
                            NPM RUN SERVER</code> no terminal.
                    </p>
                    <Button action={() => {
                        setAcceptedWarnToLocalStorage()
                        setIsModalOpen(false)
                    }

                    } text='Estou ciente' variant='create' />
                </Modal>
            }
            <main>
                {children}
            </main>
        </div>
    );
}
