import ReactDOM from 'react-dom/client';
import './scss/index.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Constructor } from './component/Constructor';

const rootElem = document.getElementById('root');
if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);
  root.render(
    <Provider store={store}>
      <Constructor />
    </Provider>
  );
}
