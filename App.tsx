import React, {Component} from 'react';
import {StatusBar, Linking, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Root} from 'native-base';
import {observer} from 'mobx-react';
import {action, toJS} from 'mobx';

import {HomeScreen, ProfileScreen} from './src/screens';
import {appState} from './src/store';
import {checkInternet, initNotification} from './src/configs';
import NoInternet from './src/components/NoInternet';

const Stack = createStackNavigator();
const navigationConfig = {
  cardStyle: { backgroundColor: '#000000' },
  animationEnabled: false,
  headerShown: false,
};

@observer
class App extends Component {
  private notificationOpenedListener: any;
  private onMessageListener: any;
  private onBackgroundMessageListener: any;

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
    appState.clearPing();
    this.onMessageListener && this.onMessageListener();
    this.onBackgroundMessageListener && this.onBackgroundMessageListener();
    this.notificationOpenedListener && this.notificationOpenedListener();
  }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        this.handleOpenURL(url);
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
    checkInternet(false, this.init);
  }

  @action init = async (started: boolean, isConnected: boolean) => {
    appState.setConnection(isConnected);
    if (!started) {
      await initNotification(this.notificationClick);
      await appState.init();
    }
  };

  handleOpenURL(event: any) {
    console.log(event);
  }

  notificationClick = (remoteMessage: any) => {
    if (remoteMessage?.data) {

    }
  };


  render() {
    if (!appState.ready) {
      return null;
    }
    return (
      <Root>
        <StatusBar barStyle="light-content" />
        <NavigationContainer>
          <Stack.Navigator screenOptions={navigationConfig}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        {!toJS(appState.connection) && toJS(appState.ready)
          ?
          <NoInternet visible={!toJS(appState.connection)} />
        ) : null
        }
      </Root>
    );
  }
}

export default App;
