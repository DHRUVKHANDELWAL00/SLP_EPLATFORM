import React,{ReactNode} from 'react'
import { Provider} from 'react-redux'
import {store} from '../redux/store';
type Props = {
    children: any,
}

export function Providers({children}:Props){
    return <Provider store={store}>{children}</Provider>;
}