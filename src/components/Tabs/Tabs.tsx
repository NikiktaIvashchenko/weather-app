import './Tabs.scss';
import Switch from "../Switch/Switch";

function Tabs() {
    return (
        <Switch classNames={['tabs']}>
            <span className='slider__item left' id='tabs-left'>Forecast</span>
            <span className='slider__item right' id='tabs-right'>Air quality</span>
        </Switch>
    );
}

export default Tabs;