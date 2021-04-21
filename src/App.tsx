import React from 'react';
import {View, StyleSheet} from 'react-native';
import * as GoogleSignIn from 'expo-google-sign-in';

import {GoogleButton} from './components';

class App extends React.Component {
  componentDidMount() {
    this.initSignIn();
  }

  initSignIn = async () => {
    await GoogleSignIn.initAsync();

    const trial = await GoogleSignIn.signInSilentlyAsync();
    console.log(trial);
  };

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.image} />
        <GoogleButton
          onPress={() => console.log('pressed')}
          buttonText="Continue with Google"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
  image: {
    height: 400,
    width: '100%',
    backgroundColor: 'red',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 3,
  },
});

export default App;
