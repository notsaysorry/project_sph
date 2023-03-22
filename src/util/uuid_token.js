import { v4 as uuidv4 } from 'uuid';
export const getUuid = () => {
    let uuid = localStorage.getItem("UUID_TOKEN");
    if (!uuid) {
        uuid = uuidv4();
        localStorage.setItem("UUID_TOKEN", uuid)
    }
    return uuid
}