import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';

type Props = {
  buttonViewStyle?: ViewStyle;
  logoStyle?: ImageStyle;
  textStyle?: TextStyle;
  buttonText?: string;
  onPress(): void;
};

class GoogleButton extends React.Component<Props> {
  render() {
    return (
      <TouchableOpacity
        style={{...styles.googleStyle, ...this.props.buttonViewStyle}}
        onPress={this.props.onPress}>
        <Image
          source={require('../images/google.png')}
          style={{...styles.imageIconStyle, ...this.props.logoStyle}}
        />
        <Text style={{...styles.textStyle, ...this.props.textStyle}}>
          {this.props.buttonText
            ? this.props.buttonText
            : 'Sign in with Google'}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  googleStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: 220,
    borderRadius: 5,
    margin: 5,
  },
  imageIconStyle: {
    padding: 10,
    marginLeft: 15,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  textStyle: {
    color: '#575757',
    marginLeft: 15,
    marginRight: 20,
  },
});

export {GoogleButton};
