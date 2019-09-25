import {useContext} from 'react';
import {NetworkContext} from "../context";

export default ()=> {
    const {request} = useContext(NetworkContext);
    return request;
};
