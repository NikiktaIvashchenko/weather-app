import Button from '../Button/Button';
import './Header.scss'

import apps from '../../assets/icons/fi-sr-apps.svg';
import notification from '../../assets/icons/fi-sr-bell.svg';
import SearchInput from '../SearchInput/SearchInput';
import { Row } from 'react-bootstrap';
import Switch from '../Switch/Switch';

import accountImage from '../../assets/icons/account-image.jpg'
import light from '../../assets/icons/light-theme.svg'
import dark from '../../assets/icons/dark-theme.svg'
import { memo, useEffect, useState } from 'react';
import { GeolocationInfo, IWeatherForecast, Theme } from '../../utils/types';
import { WeatherForecast } from '../../utils/classes';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../utils/redux/hooks';

const axios = require('axios').default

type HeaderProps = {
    classNames?: string[];
}

function Header({ classNames = [] }: HeaderProps) {

    const [theme, setTheme] = useState<Theme>(Theme.Dark);

    const geoposition = useAppSelector(state => state.geolocation.value);
    console.log(geoposition);

    return (
        <div className='app-header'>
            <div className='left-side'>
                <Button>
                    <img src={apps} alt='apps' />
                </Button>
                <Button>
                    <img src={notification} alt='apps' />
                </Button>
                <span className='geoposition'>
                    {geoposition.name},{geoposition.country}
                </span>
            </div>
            <SearchInput placeholder='Search' />
            <div className='right-side '>
                <Switch onClick={() => setTheme}>
                    <img className='slider__item left' src={light} alt='light-theme' />
                    <img className='slider__item right' src={dark} alt='dark-theme' />
                </Switch>
                <div className='account'>
                    <img src={accountImage} className='account__image' alt='' />
                </div>
            </div>
        </div>
    );
}

export default memo(Header);