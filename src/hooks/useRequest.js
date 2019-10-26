import {useContext} from 'react';
import {NetworkContext} from "../context";

export default () => {
    const context = useContext(NetworkContext);
    return context.request;
};
