import './Switch.scss'
import { ReactElement, ReactNode } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { ActiveDataType } from '../../utils/types';


type SwitchProps = {
    children: ReactElement | ReactNode;
    classNames?: string[];
    onClick: () => void;
}

function Switch({ children, classNames = [], onClick }: SwitchProps) {
    return (
        <label className={['switch', ...classNames].join(' ')}>
            <input type='checkbox' onClick={onClick} />
            <span className='slider round'>
                {children}
            </span>
        </label>
    );
}

export default Switch;