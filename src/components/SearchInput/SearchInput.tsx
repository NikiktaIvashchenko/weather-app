import './SearchInput.scss'

import searchIcon from '../../assets/icons/fi-rr-search.svg';
import { IWeatherForecast } from '../../utils/types';

import { useFormik } from 'formik';

import { useRef, useState, memo } from 'react';
import { useAppDispatch } from '../../utils/redux/hooks';
import { setGeolocation } from '../../utils/redux/slices/geoSlice';


const axios = require('axios').default
const yup = require('yup');

interface SearchInputProps {
    placeholder?: string,
    classNames?: string[],
}

function SearchInput({ placeholder, classNames = [] }: SearchInputProps) {

    const [isFocused, setIsFocused] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    console.log('search input render')

    let CityNameValidationSchema = yup.object().shape({
        targetName: yup.string()
            .required()
            .matches(/^[а-яА-Я|a-zA-Z]+(?:[\s-][а-яА-Я|a-zA-Z]+)*$/)
    })

    const formik = useFormik({
        initialValues: {
            targetName: ''
        },
        onSubmit: values => {
            axios.get(`${process.env.REACT_APP_WEATHER_API_LINK}/weather?q=${values.targetName}&appid=${process.env.REACT_APP_WEATHER_API}`)
                .then(({ data }: { data: IWeatherForecast }) => dispatch(setGeolocation({
                    name: data.name,
                    lat: data.coord.lat,
                    lon: data.coord.lon,
                    country: data.sys.country,
                })))
                .catch((err: Error) => console.log(err.message))
        },
        validationSchema: CityNameValidationSchema
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className='input-container'>
                <img src={searchIcon} alt='' className='input-container__icon' />
                <input className={['input', ...classNames].join(' ')}
                    placeholder={placeholder}
                    name='targetName'
                    onChange={formik.handleChange}
                    value={formik.values.targetName}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                {(isFocused)
                    ? formik.errors.targetName ? <div>{formik.errors.targetName}</div> : null
                    : null
                }
            </div >
        </form>
    );
}

export default memo(SearchInput);