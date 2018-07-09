import { createStackNavigator } from 'react-navigation';
import AppTabs from './AppTabs';
import EggEditorModal from '../containers/EggEditor';

export default createStackNavigator(
  {
    Tabs: AppTabs,
    EggModal: EggEditorModal,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);
