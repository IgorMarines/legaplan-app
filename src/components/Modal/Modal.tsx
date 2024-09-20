import { IModalProps } from '@/Interfaces/ModalInterface';
import './styles.scss';

export const Modal = ({ children, title, isOpen, onClose }: IModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{title}</h2>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
}
