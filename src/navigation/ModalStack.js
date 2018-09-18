import { createStackNavigator } from 'react-navigation';
import AppTabs from './AppTabs';
import EggEditor from '../components/EggEditor';
import BulkEditor from '../components/BulkEditor';
import ChickenEditor from '../components/ChickenEditor';

export default createStackNavigator(
  {
    Tabs: AppTabs,
    EggEditor,
    BulkEditor,
    ChickenEditor,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);
