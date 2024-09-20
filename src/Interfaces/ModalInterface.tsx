export interface IModalProps {
    children: React.ReactNode;
    title: string;
    isOpen: boolean;
    onClose: () => void;
}