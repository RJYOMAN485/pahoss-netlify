import Vue from 'vue'
import axios from 'axios'

// axios.defaults.withCredentials = true;

// axios.defaults.headers.common['X-CSRF-TOKEN'] = "eyJpdiI6Ikt2clA1dHNXY0NXTUdVcGliTDM1Rnc9PSIsInZhbHVlIjoiQjhjZkcvd0lhM1lFYXk1SURKM3k4NlFRbTU0Um5mVndmVzBaK2VSTXd3UTNBY3p0clg0cDd1N0Z4L1gxZ0dCUjMzckdiWm02dTAvNjZNalVqY0JSUzZxSVZZbWFXSWxxQ1NFR0tiVnY0R0pFTDVCb2hFT3JhVjFOYmo0cFYraGMiLCJtYWMiOiJlNzM3ZmUzZTdjYjllOTNmN2FlZDQ3YTk3ZjlkMDZkMmI5M2I5ZTIzOTBiYWJiMGE1ODhiZTVkODVjNGVhMjc5In0%3D"


// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

axios.defaults.baseURL = "https://pahoss.herokuapp.com/api"


Vue.prototype.$axios = axios
