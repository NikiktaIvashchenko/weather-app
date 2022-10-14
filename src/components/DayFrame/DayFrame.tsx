import './DayFrame.scss'

type DayFrameProps = {
    dayName: string;
    weatherIcon: string;
    temperature: number;
    classNames?: string[];
}

function DayFrame({ dayName, weatherIcon, temperature, classNames = [] }: DayFrameProps) {
    return (
        <div className={['day-frame', ...classNames].join(' ')}>
            <span className='day-frame__day-name'>{dayName}</span>
            <img src={require(`../../assets${weatherIcon}`)} className='day-frame__weather-icon' alt='weather' />
            <span className='day-frame__temperature'>{temperature}°</span>
        </div>
    );
}

export default DayFrame;