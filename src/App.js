import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Main";
import FeedbackForm from "./feedback/FeedBack";
import Thanks from "./feedback/Thanks";
import { TourProvider } from '@reactour/tour';
import { theme} from './styles/Themes';
import { ThemeProvider } from '@mui/material';
import { useState } from "react";

export default function App() {
  const [themeName, setThemeName] = useState(() => localStorage.getItem("Theme") || 'blue');

  // Tour Component Styles
  const style = {
    popover: (base) => ({
      ...base,
      backgroundColor: '#333',
      color: '#fff',
      borderRadius: '10px',
      padding: '40px',
      fontFamily: "Montserrat",
      fontWeight : "bold"
    }),
    maskArea: (base) => ({
      ...base,
      stroke: '#1976d2',
      strokeWidth: 6,
      padding: "100px",

    }),
    controls: (base) => ({
      ...base,
      button: {
        marginRight: 10,
        background: '#1976d2',
        color: '#fff',
      },
    }),
    arrow: (base) => ({
      ...base,
      Color: '#1976d2',
    }),



  }
  // Messages en-ar for User

  const steps = [
    {
      selector: '.head',
      content: 'Welcome to Weather AS!',

    },
    {
      selector: '.head',
      content: 'Here you can change your theme ',
    },
    {
      selector: '.head',
      content: "مرحبًا بكم في Weather AS!",
    },
    {
      selector: '.head',
      content: 'هنا يمكنك تغيير الألوان'
    },
  ];
  // Routes and provider for the whole app
  return (

    <div>
      <ThemeProvider theme={theme[themeName]}>
      <TourProvider steps={steps} styles={style}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main setThemeName={setThemeName} themeName = {themeName}/>} />
            <Route path="/feedback" element={<FeedbackForm />} />
            <Route path="/feedback/thanks" element={<Thanks />} />
          </Routes>
        </BrowserRouter>
      </TourProvider>
      </ThemeProvider>
    </div>

  )
}
