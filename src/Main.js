
import './styles/App.css';
import Typography from '@mui/material/Typography';
// Material UI componenets
import Container from '@mui/material/Container';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios'
import moment from "moment"
import "moment/min/locales"
import "./i18n"
import { useTranslation } from 'react-i18next';
import CountryForm from './forms/CountryForm';
import Footer from './components/Footer';
import { theme } from './styles/Themes';
import { useRef } from 'react';
import { gsap } from 'gsap'
import Toast from './components/Toast';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Map from './components/Map';
import { Link } from 'react-router-dom';


import { useTour } from '@reactour/tour';

// axois

let cancelAxios = null
function Main({ setThemeName, themeName }) {

    const { setIsOpen } = useTour();
    useEffect(() => {
        setIsOpen(true); // opens the tour when this component mounts
    }, [setIsOpen]);
    const { t, i18n } = useTranslation()


    const [lg, setLg] = useState("ar")
    const [inputValue, setInputValue] = useState("")
    const [country, setCountry] = useState("Casablanca")
    const [isAnimated, setIsAnimated] = useState(false)
    const [Coord, setCoord] = useState({
        lat: 33.5731,
        lon: -7.5898,
    })

    const [cityNames, setCityNames] = useState({
        ar: "الداربيضاء",
        en: 'Casablanca',
    });

    const [name, setName] = useState("")
    function handleSubmit(e) {
        e.preventDefault()
        setCountry(inputValue)

    }

    const [temp, setTemp] = useState({
        temp: null,
        tempmin: null,
        tempmax: null,
        description: "",
        icon: null,
    })
    function changeLanguage() {
        const newLang = lg === "ar" ? "en" : "ar";
        setLg(newLang);



    }
    let today = useMemo(() => {
        moment.locale(lg);
        return moment().format('MMMM Do YYYY, h:mm:ss a');
    }, [lg]);
    useEffect(() => {
        setName(lg === "ar" ? cityNames.ar : cityNames.en);
    }, [lg, cityNames]);
    useEffect(() => {
        i18n.changeLanguage(lg)
    }, [lg, i18n])

    let weatherKey = process.env.REACT_APP_API_WEATHER_KEY
    useEffect(() => {
        const geoCancelToken = axios.CancelToken.source();
        axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${country},&limit=1&appid=${weatherKey}
    `, {
            cancelToken: geoCancelToken.token

        }).then((response) => {
            if (!response.data || response.data.length === 0) {
                console.warn("No location data found");
                return;
            }
            setCityNames({
                ar: response.data[0].local_names?.ar || response.data[0].name,
                en: response.data[0].name,
            });

            if (response.status >= 200 && response.status < 300) {
                setCoord({ lat: response.data[0].lat, lon: response.data[0].lon })
            } else {
                console.log("No data found for country")
            }

        }).catch((error) => {
            console.error("Geo API Error:", error.message);
        })

        return () => {

            geoCancelToken.cancel();

        }

    }, [country, weatherKey])


    useEffect(() => {


        // Get by name of country
        // Using Lat and lon
        if (Coord.lat === null || Coord.lon === null) return;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${Coord.lat}&lon=${Coord.lon}&units=metric&lang=en&appid=${weatherKey}`, {
            cancelToken: new axios.CancelToken((c) => { cancelAxios = c })

        })

            .then(function (response) {
                // handle success

                let tempMax = Math.ceil(response.data.main.temp_max)
                let tempr = Math.round(response.data.main.temp)
                let tempMin = Math.round(response.data.main.temp_min)
                let descrp = response.data.weather[0].description
                let icon = response.data.weather[0].icon

                setTemp({
                    temp: tempr,
                    tempmin: tempMin,
                    tempmax: tempMax,
                    description: descrp,
                    icon: icon,
                })

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
        return () => {

            if (typeof cancelAxios === 'function') cancelAxios();


        }

    }, [Coord, weatherKey])

    function changeTheme(color) {
        setThemeName(color)
    }
    let headRef = useRef()
    let menuColor = useRef()
    let lineRef = useRef()
    const animateForm = () => {
        if (headRef !== null && menuColor !== null && lineRef !== null)
            if (!isAnimated) {
                setIsAnimated(true)
                gsap.to(
                    headRef.current,
                    { x: 300, yoyo: true, repeat: 1 },
                );
                gsap.fromTo(
                    menuColor.current,
                    { y: 300, duration: "1", opacity: 1 }, { y: 0, duration: "1" }
                );
                gsap.from(
                    lineRef.current,
                    { width: "0", duration: "1" },
                );

            }
            else {
                setIsAnimated(false)
                gsap.to(
                    menuColor.current,
                    { y: 300, duration: "0.8", opacity: 1 }
                );

            }




    };
    return (
        <div className="App" style={{ backgroundColor: theme[themeName].palette.background.default }} >



            <Container maxWidth="sm" >
                <div style={{ height: "80vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                    {/*  Weather Card  */}
                    <Toast changeTheme={changeTheme} menuColor={menuColor} themChoice={themeName} />
                    {/* <ColorToggel theme={theme} changeTheme={changeTheme} menuColor={menuColor} /> */}
                    <div style={{ color: "white", fontSize: "50px", fontWeight: "800", background: theme[themeName].palette.primary.main, borderRadius: "5px", padding: "5px 20px", fontFamily: "Pixelify", zIndex: "10", cursor: "pointer" }} ref={headRef} onClick={() => { animateForm() }} className='head'>Weather AS</div>
                    <div style={{ background: theme[themeName].palette.primary.main, color: "white", padding: "12px", borderRadius: "12px", width: "100%", boxShadow: "0 11px 1px rgba(0, 0, 0, 0.23)", zIndex: "10" }}>
                        {/* Content */}
                        <div>
                            {/* City && time  */}
                            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "start", fontWeight: "500 !important", gap: "5px", padding: "6px" }} dir={lg === "ar" ? "rtl" : "ltr"}>
                                <Typography variant="h2" gutterBottom >
                                    {name}
                                </Typography>
                                <Typography variant="h5" gutterBottom style={{ marginRight: "10px" }}>
                                    {today}
                                </Typography>


                            </div>
                            {/* End City && time  */}
                            <hr ref={lineRef} />
                            <div style={{ display: "flex", flexDirection: "row-reverse", justifyContent: "space-evenly" }}>
                                {/* Description */}
                                <div>
                                    <div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "center" }}>
                                        <h1 style={{ fontWeight: "300", fontSize: "6rem", margin: "2px", lineHeight: " 1.167", fontFamily: "IBM" }}>{temp.temp}</h1>

                                        <img src={`https://openweathermap.org/img/wn/${temp.icon}@2x.png`} alt='weather' width="100"
                                            height="100" />

                                    </div>

                                    <Typography variant="h6" gutterBottom style={{ textAlign: "right", fontWeight: "300" }}>
                                        {t(temp.description)}
                                    </Typography>
                                    <div style={{ display: 'flex', gap: "10px", fontFamily: "Montserrat" }}>
                                        <h5 >{`${temp.tempmin}: ${t("Min")} `}</h5>
                                        <p>|</p>
                                        <h5>{`${temp.tempmax} : ${t("Max")}`}</h5>

                                    </div>
                                </div>
                                {/* End  Description */}
                                <CloudIcon style={{ fontSize: "200px" }} />
                            </div>

                        </div>
                        {/* End Content */}
                    </div>
                    {/* End  Weather Card  */}
                    <div style={{ display: 'flex', width: "100%", justifyContent: "start", paddingLeft: "10px", marginTop: "20px" }}>
                        <Button variant="text" onClick={() => { changeLanguage() }} >{lg === "ar" ? "English" : "Arabic"}</Button>
                    </div>
                    <div style={{ display: "flex", justifyContent: 'center', width: "100%" }}>
                        <CountryForm inputValue={inputValue} setInputValue={setInputValue} handleSubmit={handleSubmit} t={t} />
                    </div>
                </div>
            </Container>
            <Link to={"/feedback"}><Button variant="contained" sx={{ width: "220px", height: "60px", fontWeight: 600, fontFamily: lg === "ar" ? "IBM" : "pixelify", fontSize: "20px" }}>{lg === "ar" ? "اترك ملاحظاتك" : "leave a feedback"}</Button></Link>
            <h1 style={{ color: "white", fontSize: "80px", fontFamily: lg === "ar" ? "IBM" : "pixelify", marginBottom: "4px", marginTop: "20px" }}>{t('Map')}</h1>
            <Container maxWidth="md" sx={{ marginBottom: "80px", border: "6px solid white", paddingTop: "20px", paddingBottom: "20px", borderRadius: "5px" }} >
                <MapContainer center={[Coord.lat, Coord.lon]} zoom={13} style={{ height: "400px", width: "100%", borderRadius: "5px" }} >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Map lat={Coord.lat} lon={Coord.lon} />
                </MapContainer>
            </Container>

            <Footer t={t} />



        </div>
    );
}

export default Main;
