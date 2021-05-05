import React from 'react';
import * as GoogleSignIn from 'expo-google-sign-in';
import * as Splash from 'expo-splash-screen';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';

import {StoreState} from './global';
import {authenticate} from './global/actions/auth';

import {initTable} from './db';
import {RootStackParamList} from './navigators';

type Props = {
  authUser: GoogleSignIn.GoogleUser | null;
  authenticate: typeof authenticate;
};

const Stack = createStackNavigator<RootStackParamList>();

class App extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.initSignIn();
    initTable();
  }

  initSignIn = async () => {
    await Splash.preventAutoHideAsync();
    await GoogleSignIn.initAsync();

    const user = await GoogleSignIn.signInSilentlyAsync();

    if (user) {
      this.props.authenticate(user);
    }
    await Splash.hideAsync();
  };

  render() {
    return (
      <Stack.Navigator headerMode="none">
        {this.props.authUser ? (
          <>
            <Stack.Screen
              name="Home"
              component={require('./screens/Home').default}
            />
            <Stack.Screen
              name="Items"
              component={require('./screens/Items').default}
            />
            <Stack.Screen
              name="Groups"
              component={require('./screens/Groups').default}
            />
          </>
        ) : (
          <Stack.Screen
            name="Auth"
            component={require('./screens/Auth').default}
          />
        )}
      </Stack.Navigator>
    );
  }
}

const mapStateToProps = (store: StoreState) => {
  return {
    authUser: store.auth,
  };
};

export default connect(mapStateToProps, {authenticate})(App);
