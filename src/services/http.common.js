import axios from 'axios';

export default axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? `${window.location.origin}/api/` : "http://localhost:3006/api/",
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
    },
    timeout: 60000*1000
})  
