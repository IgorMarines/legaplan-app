import './styles.scss';

interface ButtonProps {
    text: string;
    action: () => void;
    height?: number;
    width?: number;
    margin?: string;
    variant?: 'create' | 'default' | 'danger';
}

export const Button = ({ text, action, variant = 'default', height, width, margin }: ButtonProps) => {
    return (
        <button
            onClick={action}
            className={`button ${variant}`}
            style={{ width: width, height: height, margin: margin }}
        >

            {text}

        </button>
    );
}
