import { NavigationActions, StackActions } from 'react-navigation';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function resetTabs(routeName: string = 'Settings') {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: 'Tabs',
        action: NavigationActions.navigate({
          routeName,
        }),
      }),
    ],
    key: null,
  });
  navigator.dispatch(resetAction);
}

export default {
  navigate,
  setTopLevelNavigator,
  resetTabs,
};
