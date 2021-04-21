import React from 'react';
import {View, Text} from 'react-native';
import {Appbar} from 'react-native-paper';

class Home extends React.Component {
  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.Content title="Stox Manager" />
          <Appbar.Action icon="magnify" onPress={() => console.log('hii')} />
        </Appbar.Header>
        <Text>Hello there</Text>
      </View>
    );
  }
}

export default Home;
