import React, { useState, useEffect, memo } from 'react'

type ClockProps = {
    classNames: string[];
}

function Clock({ classNames }: ClockProps) {

    const [time, setTime] = useState<string>();

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-EN', {
                hour: '2-digit',
                minute: '2-digit'
            }))
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [])

    return (
        <span className={['clock', ...classNames].join(' ')}>
            {time}
        </span>
    );
}

export default memo(Clock);