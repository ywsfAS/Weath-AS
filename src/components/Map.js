import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export default function Map({lat,lon}) {
    let newMap = useMap();
    useEffect(()=>{
        newMap.setView([lat,lon])
    },[lon,lat,newMap])
    return null

}
