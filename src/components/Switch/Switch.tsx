import './Switch.scss'
import { ReactElement, ReactNode } from 'react';


type SwitchProps = {
    children: ReactElement | ReactNode;
    classNames?: string[];
}

function Switch({ children, classNames = [] }: SwitchProps) {
    return (
        <label className={['switch', ...classNames].join(' ')}>
            <input type='checkbox' />
            <span className='slider round'>
                {children}
            </span>
        </label>
    );
}

export default Switch;