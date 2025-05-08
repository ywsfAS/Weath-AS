import '../styles/Login.css';
import TextField from '@mui/material/TextField';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { useForm, ValidationError } from '@formspree/react';
import Thanks from './Thanks';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { useState } from 'react';

export default function FeedbackForm() {
    // formspree Validation for feedback User 
    let key = process.env.REACT_APP_FORM_KEY
    const [state, handleSubmit] = useForm(key);
    const [value, setValue] = useState(2);
    if (state.succeeded) {
        return <Thanks />;
    }

    return (
        <header className="App-header">
            <div className='Container-login'>

                <div className='title-login'>
                    <Link to={"/"} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className='icon'>
                            <AcUnitIcon sx={{ fontSize: "80px" }} />
                            <h1>Weather AS</h1>
                        </div>
                    </Link>
                    <div className='login'>Login</div>
                </div>

                <div className='login-box'>
                    <form onSubmit={handleSubmit}>
                        <div className='inputs'>
                            <div className='Email'>
                                <p>EMAIL</p>
                                <input placeholder='Example@mail.com' id="email" type="email" name="email" />
                                <ValidationError prefix="Email" field="email" errors={state.errors} />
                            </div>
                            <div style={{ marginTop: "20px" }}>
                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                />
                            </div>



                            <div className='Password'>
                                <p>Feedback</p>
                                <TextField
                                    sx={{ width: "400px" }}
                                    id="filled-multiline-static"
                                    label="Feedback"
                                    multiline
                                    rows={4}
                                    defaultValue=""
                                    variant="filled"
                                    name="message"
                                />
                                <ValidationError prefix="Message" field="message" errors={state.errors} />
                            </div>
                        </div>

                        <button className='Forget-button' type="submit" style={{ cursor: "pointer" }} disabled={state.submitting}>
                            Send
                        </button>
                    </form>
                </div>

                <div className='create-account'>We appreciate your feedback 🖤</div>
            </div>
        </header>
    );
}
