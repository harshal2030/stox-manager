import React from 'react';
import {View, StyleSheet, Alert, ScrollView} from 'react-native';
import {Appbar, TextInput, Button} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {connect} from 'react-redux';
import {nanoid} from 'nanoid';

import {insertItem, updateItem, deleteItem} from '../global/actions/items';
import {StoreState} from '../global';

import {RootStackParamList} from '../navigators';
import {insertInItems, updateTable, deleteFromTable, Item} from '../db';
import {flatRed} from '../utils/colors';

type navigation = StackNavigationProp<RootStackParamList, 'Items'>;

type Props = {
  navigation: navigation;
  route: RouteProp<RootStackParamList, 'Items'>;
  items: Item[];
  insertItem: typeof insertItem;
  updateItem: typeof updateItem;
  deleteItem: typeof deleteItem;
};

type State = {
  name: string;
  buy: string;
  sell: string;
  price: string;
};

class Items extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const params = props.route.params;

    let price: string = '';

    if (params && params.item!.price) {
      price = params.item!.price.toString();
    }

    this.state = {
      name: params ? params.item!.name : '',
      buy: params ? params.item!.buy.toString() : '',
      sell: params ? params.item!.sell.toString() : '',
      price,
    };
  }

  createNew = () => {
    const {name, buy, sell} = this.state;
    const id = nanoid(10);
    const price =
      this.state.price.trim().length === 0
        ? null
        : parseInt(this.state.price, 10);

    insertInItems(id, name, parseInt(buy, 10), parseInt(sell, 10), price, () =>
      Alert.alert('Oops!', 'Something went wrong! Please try again later.'),
    );

    this.props.insertItem({
      id,
      name,
      buy: parseInt(buy, 10),
      sell: parseInt(sell, 10),
      price,
    });
    this.props.navigation.goBack();
  };

  update = () => {
    const {name, buy, sell} = this.state;
    const id = this.props.route.params!.item!.id;
    const price =
      this.state.price.trim().length === 0
        ? null
        : parseInt(this.state.price, 10);

    updateTable(id, name, parseInt(buy, 10), parseInt(sell, 10), price, () =>
      Alert.alert('Oops!', 'Something went wrong! Please try again later.'),
    );

    this.props.updateItem({
      id,
      name,
      buy: parseInt(buy, 10),
      sell: parseInt(sell, 10),
      price,
    });
    this.props.navigation.goBack();
  };

  delete = () => {
    if (this.props.route.params) {
      this.props.deleteItem(this.props.route.params.item!);
      deleteFromTable(this.props.route.params.item!.id, () =>
        Alert.alert('Oops!', 'Something went wrong! Please try again later.'),
      );
      this.props.navigation.goBack();
    }
  };

  onSavePress = () => {
    if (this.props.route.params) {
      this.update();
    } else {
      this.createNew();
    }
  };

  render() {
    const {name, sell, buy, price} = this.state;
    const inStockNum = parseInt(buy, 10) - parseInt(sell, 10);
    const inStock = isNaN(inStockNum) ? '0' : inStockNum.toString();

    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content title="Add Item" />
        </Appbar.Header>

        <ScrollView>
          <TextInput
            label="Stock Name"
            style={styles.input}
            value={name}
            onChangeText={(text) => this.setState({name: text})}
          />
          <TextInput
            label="Buy Quantity"
            style={styles.input}
            onChangeText={(text) => this.setState({buy: text})}
            value={buy}
            keyboardType="numeric"
          />
          <TextInput
            label="Sell Quantity"
            style={styles.input}
            onChangeText={(text) => this.setState({sell: text})}
            value={sell}
            keyboardType="numeric"
          />
          <TextInput
            label="In Stock"
            keyboardType="numeric"
            disabled
            value={inStock}
            onChangeText={(text) => this.setState({price: text})}
            style={styles.input}
          />
          <TextInput
            label="Cost Price"
            keyboardType="numeric"
            placeholder="(Optional)"
            value={price}
            onChangeText={(text) => this.setState({price: text})}
            style={styles.input}
          />
          <Button
            mode="contained"
            style={styles.buttonContainer}
            contentStyle={styles.button}
            onPress={this.onSavePress}>
            Save
          </Button>
          {this.props.route.params && (
            <Button
              mode="contained"
              style={styles.buttonContainer}
              contentStyle={[styles.button, {backgroundColor: flatRed}]}
              onPress={this.delete}>
              Delete
            </Button>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    margin: 10,
  },
  button: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {margin: 10},
});

const mapStateToProps = (state: StoreState) => {
  return {
    items: state.items,
  };
};

export default connect(mapStateToProps, {
  insertItem,
  updateItem,
  deleteItem,
})(Items);
