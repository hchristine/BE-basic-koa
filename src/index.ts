import { start } from "./server";
import cloudinary from 'cloudinary';


cloudinary.v2.config({
    cloud_name: 'dhtzy18pv',
    api_key: '787331694111768',
    api_secret: 'eqmU5_B911FBTUaReQJ8hdKsW8g'
});

start();