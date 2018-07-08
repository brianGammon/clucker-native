import { createStackNavigator } from 'react-navigation';
import TabNavigator from './AppTabs';
import EggEditorModal from '../containers/EggEditor';

export default createStackNavigator(
  {
    Tabs: TabNavigator,
    EggModal: EggEditorModal,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);
