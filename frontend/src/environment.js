let IS_PROD = true;
const server = IS_PROD ?
    "https://video-calling-app-backend-vape.onrender.com" :

    "http://localhost:8080"


export default server;