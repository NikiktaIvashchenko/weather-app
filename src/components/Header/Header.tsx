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
import { useEffect, useState } from 'react';
import { GeolocationInfo, IWeatherForecast } from '../../utils/types';
import { useGeolocation } from '../../utils/hooks/useGeolocation';
import { WeatherForecast } from '../../utils/classes';
import { useSelector } from 'react-redux';
import { GeoContext, useGeo } from '../../utils/contexts';

const axios = require('axios').default

type HeaderProps = {
    classNames?: string[];
}

function Header({ classNames = [] }: HeaderProps) {

    const { info } = useGeo();

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
                    {info?.cityName}
                </span>
            </div>
            <SearchInput placeholder='Search' />
            <div className='right-side '>
                <Switch>
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

export default Header;