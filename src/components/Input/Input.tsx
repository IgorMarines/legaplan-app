import { IInputProps } from "@/Interfaces/InputInterface";


export const Input = ({ placeholder, value, onChange, type, name, id, required, disabled, className, style, label, labelStyle, labelClassName, ...props }: IInputProps) => {
    return (
        <div>
            {label && <label htmlFor={id} style={labelStyle} className={labelClassName}>{label}</label>}
            <input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={className}
                style={style}
                {...props}
            />
        </div>
    );
}