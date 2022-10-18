import './Tabs.scss';
import Switch from "../Switch/Switch";
import { Dispatch, SetStateAction } from 'react';
import { ActiveDataType } from '../../utils/types';

type TabsProps = {
    onClick: () => void;
}

function Tabs({ onClick }: TabsProps) {
    return (
        <Switch classNames={['tabs']} onClick={onClick}>
            <span className='slider__item left' id='tabs-left'>Forecast</span>
            <span className='slider__item right' id='tabs-right'>Air quality</span>
        </Switch>
    );
}

export default Tabs;