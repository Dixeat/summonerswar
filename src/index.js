import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


store.dispatch({type: 'ACTION_MONSTER_NAME', value: ''})

console.log(store.getState());

const MainApp = (props) => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}
ReactDOM.render(<MainApp />, document.getElementById('root'));
registerServiceWorker();
