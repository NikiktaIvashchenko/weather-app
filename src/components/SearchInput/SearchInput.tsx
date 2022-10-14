import React, { DetailedHTMLProps, InputHTMLAttributes, KeyboardEventHandler, ReactElement, ReactNode, useMemo, useState } from 'react';
import { useRef, useEffect } from 'react';
import './SearchInput.scss'

import searchIcon from '../../assets/icons/fi-rr-search.svg';
import { CitiesResponse, ICity, GeolocationInfo } from '../../utils/types';
import { CITIESAUTOCOMPLETE_API_OPTIONS } from '../../api';

import { Formik, FormikErrors, FormikValues } from 'formik';
import { debounce } from 'lodash';

const axios = require('axios').default
const yup = require('yup');

interface SearchInputProps {
    placeholder?: string,
    classNames?: string[],
}

function SearchInput({ placeholder, classNames = [] }: SearchInputProps) {

    let schema = yup.string().matches(/^[a-zA-z]+$/);

    const [targetName, setTargetName] = useState<string>('');

    const debouncedSearch = useRef(
        debounce((name: string) => {
            schema.isValid(name).then((res: boolean) => {
                if (!res) return;
                CITIESAUTOCOMPLETE_API_OPTIONS.params.q = name;
                axios.request(CITIESAUTOCOMPLETE_API_OPTIONS).then(function (response: CitiesResponse) {
                    if (response.data.length !== 0)
                        console.log(response.data);
                }).catch(function (error: any) {
                    console.error(error);
                });
            });
        }, 500)
    ).current;

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        }
    }, [debouncedSearch])

    useEffect(() => {
        debouncedSearch(targetName)
    }, [targetName])

    return (
        <div className='input-container'>
            <img src={searchIcon} alt='' className='input-container__icon' />
            <input className={['input', ...classNames].join(' ')}
                placeholder={placeholder}
                value={targetName}
                onChange={(e) => setTargetName(e.target.value)}
            />
        </div >
    );
}

export default SearchInput;