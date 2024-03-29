import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import * as GoogleSignIn from 'expo-google-sign-in';
import {connect} from 'react-redux';

import {StoreState} from '../global';
import {authenticate} from '../global/actions/auth';

import {GoogleButton} from '../components';

type Props = {
  authUser: GoogleSignIn.GoogleUser | null;
  authenticate: typeof authenticate;
};

class Auth extends React.Component<Props> {
  signIn = async () => {
    const data = await GoogleSignIn.signInAsync();

    if (data.type === 'success' && data.user) {
      this.props.authenticate(data.user);
    }
  };

  render() {
    return (
      <View style={styles.root}>
        <Image source={require('../images/logo.png')} />
        <GoogleButton
          onPress={this.signIn}
          buttonText="Continue with Google"
          buttonViewStyle={{backgroundColor: '#4285F4', marginTop: 50}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    padding: 20,
    backgroundColor: '#DCE7E7',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (store: StoreState) => {
  return {
    authUser: store.auth,
  };
};

export default connect(mapStateToProps, {authenticate})(Auth);
