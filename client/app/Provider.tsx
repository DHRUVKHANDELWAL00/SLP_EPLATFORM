import React,{ReactNode} from 'react'
import { Provider, ProviderProps } from 'react-redux'
import {store} from '../redux/store';
type Props = {
    children: ReactNode,
}

export function Providers({children}:ProviderProps){
    return <Provider store={store}>{children}</Provider>;
}