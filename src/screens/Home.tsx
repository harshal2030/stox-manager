import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Appbar, FAB, DefaultTheme} from 'react-native-paper';
import {connect} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';

import {ItemCard} from '../components';

import {StoreState} from '../global';
import {getItems} from '../global/actions/items';
import {RootStackParamList} from '../navigators';

import {db, Item} from '../db';

type navigation = StackNavigationProp<RootStackParamList>;

type Props = {
  items: Item[];
  navigation: navigation;
  getItems: typeof getItems;
};

class Home extends React.Component<Props> {
  componentDidMount() {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM items', [], (_, {rows}) => {
        const {_array} = (rows as unknown) as {
          length: number;
          item(i: number): Item;
          _array: Item[];
        };

        this.props.getItems(_array);
      });
    });
  }

  renderItem = ({item}: {item: Item}) => {
    return (
      <ItemCard
        stock={item.stock}
        item={item.name}
        price={item.price}
        onEditPress={() => this.props.navigation.navigate('Items')}
      />
    );
  };

  render() {
    return (
      <View style={styles.root}>
        <Appbar.Header>
          <Appbar.Content title="Stox Manager" />
          <Appbar.Action icon="magnify" onPress={() => console.log('hii')} />
        </Appbar.Header>

        <FlatList
          data={this.props.items}
          keyExtractor={(i) => i.id}
          renderItem={this.renderItem}
        />

        <FAB
          icon="plus"
          color="#fff"
          style={styles.fab}
          onPress={() => console.log('hii')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 20,
    bottom: 0,
    right: 0,
    backgroundColor: DefaultTheme.colors.primary,
  },
  root: {
    flex: 1,
  },
});

const mapStateToProps = (state: StoreState) => {
  return {
    items: state.items,
  };
};

export default connect(mapStateToProps, {getItems})(Home);
