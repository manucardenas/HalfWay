import ReactOnRails from 'react-on-rails';
import 'babel-polyfill'
import Popup from '../bundles/Map/components/Popup';

// This is how react_on_rails can see the Popup in the browser.
ReactOnRails.register({
  Popup,
});
