import { IAirQuality } from '../../utils/types';
import './AirQualityFrame.scss'

type AirQualityFrameProps = {
    item: IAirQuality,
    classNames?: string[]
}

function AirQualityFrame({ item, classNames = [] }: AirQualityFrameProps) {
    return (
        <div className={['air-quality-frame', ...classNames].join(' ')}>
            <div className='air-quality-frame__title'>
                {new Date(item.dt * 1000).toLocaleDateString('en-EN', { weekday: 'short' })}
            </div>
            <div className='air-quality-frame-components'>
                <span>CO: {item.components.co}</span>
                <span>NH3: {item.components.nh3}</span>
                <span>NO: {item.components.no}</span>
                <span>NO2: {item.components.no2}</span>
                <span>O3: {item.components.o3}</span>
                <span>PM10: {item.components.pm10}</span>
                <span>PM2_5: {item.components.pm2_5}</span>
                <span>SO2: {item.components.so2}</span>
            </div>
        </div>
    );
}

export default AirQualityFrame;