export interface IInputProps {
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    name?: string;
    id?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    label?: string;
    labelStyle?: React.CSSProperties;
    labelClassName?: string;
}