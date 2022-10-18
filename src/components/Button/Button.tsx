import { FC, ReactElement, ReactNode } from 'react';
import './Button.scss'

type ButtonProps = {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    classNames?: string[];
    children?: ReactNode | ReactElement;
}

function Button({ children, classNames = [], onClick }: ButtonProps) {
    return (
        <button className={['button', ...classNames].join(' ')} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;