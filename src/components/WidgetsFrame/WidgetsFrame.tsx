import { ReactElement, ReactNode } from 'react';
import './WidgetsFrame.scss'

type WidgetsFrameProps = {
    children?: ReactNode | ReactElement;
    classNames?: string[];
}

function WidgetsFrame({ children, classNames = [] }: WidgetsFrameProps) {
    return (
        <div className={['widget', ...classNames].join(' ')}>
            {children}
        </div>
    );
}

export default WidgetsFrame;