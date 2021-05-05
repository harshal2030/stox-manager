import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Appbar, FAB, DefaultTheme, Searchbar} from 'react-native-paper';
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

type State = {
  q: string;
};

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      q: '',
    };
  }

  componentDidMount() {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT items.* FROM items INNER JOIN groups ON groups.id = items.group_id',
        [],
        (_, {rows}) => {
          const {_array} = (rows as unknown) as {
            length: number;
            item(i: number): Item;
            _array: Item[];
          };

          console.log(_array);

          this.props.getItems(_array);
        },
      );
    });
  }

  renderItem = ({item}: {item: Item}) => {
    return (
      <ItemCard
        stock={item.buy - item.sell}
        item={item.name}
        price={item.price}
        onEditPress={() => this.props.navigation.navigate('Items', {item})}
      />
    );
  };

  render() {
    const data = this.props.items.filter((val) =>
      val.name.toLowerCase().includes(this.state.q.toLowerCase()),
    );
    return (
      <View style={styles.root}>
        <Appbar.Header>
          <Searchbar
            value={this.state.q}
            placeholder="Search"
            onChangeText={(q) => this.setState({q})}
          />
        </Appbar.Header>

        <FlatList
          data={data}
          keyExtractor={(i) => i.id}
          renderItem={this.renderItem}
        />

        <FAB
          icon="plus"
          color="#fff"
          style={styles.fab}
          onPress={() => this.props.navigation.navigate('Items')}
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
