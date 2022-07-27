import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, I18nManager, Linking } from "react-native";
import axios from "axios";
import store from "../../mobxState/store";
import { Avatar, Button, Card, Title, Paragraph, List, Searchbar } from "react-native-paper";

//icons from
// https://materialdesignicons.com/

const PackageImg = (props) => (
  <Avatar.Icon {...props} icon="package-variant-closed" style={{ height: 50, width: 50 }} />
);

let PhasenModal = (props) => {
  return (
    <Card.Content style={styles.openCard} key={props.key}>
      <View style={styles.buttonsOpt}>
        <Button icon="phone-outgoing-outline" mode="contained" onPress={() => Linking.openURL(`tel:0502419634`)}>
          חייג
        </Button>
        <Button
          icon="waze"
          mode="contained"
          onPress={() => Linking.openURL(`https://waze.com/ul?q=${props.order.city}${props.order.address}`)}
        >
          נווט
        </Button>
        <Button icon="update" mode="contained" onPress={() => console.log("Pressed")}>
          עדכון
        </Button>
      </View>
      <Paragraph style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}>
        {" "}
        מועד משלוח {`${props.orderTime} ${props.orderDate} `}
      </Paragraph>
    </Card.Content>
  );
};

function OrderList(props) {
  // const [orders, SetOrders] = React.useState(store.orders);
  const [searchQuery, setSearchQuery] = React.useState(store.orders);

  const onChangeSearch = (query) => {
    try {
      let find = store.orders.find((e) => e.order_number == query);
      if (find) {
        let seaQur = [...[], find];
        setSearchQuery(seaQur);
      } else {
        setSearchQuery(store.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    // console.log(store.orders);
    {
      searchQuery.length == 0 && setSearchQuery(store.orders);
    }
    // console.log(store.orders);
  }, []);

  return (
    <View>
      <ScrollView style={styles.scrollView}>
        <List.AccordionGroup>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={{ borderRadius: 25 }}
          />
          {searchQuery?.map((order, i) => {
            return [
              <List.Accordion
                key={i + 2}
                theme={{ colors: { background: "transparent" } }}
                style={styles.containerList}
                title={` מ' ${order.order_number} - ${order.address} ${order.city} `}
                id={`${i}`}
                left={PackageImg}
              >
                <PhasenModal
                  key={i}
                  orderDate={`${order.delivery_date}`}
                  orderTime={`${order.delivery_time}`}
                  order={order}
                />
              </List.Accordion>,
            ];
          })}
        </List.AccordionGroup>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {},
  containerList: {
    direction: "rtl",
    borderRadius: 80,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "white",
    margin: 3,
  },

  buttonsOpt: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  Button: {
    width: 20,
  },
});

export default OrderList;
