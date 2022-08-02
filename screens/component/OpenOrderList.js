import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  I18nManager,
  Linking,
  KeyboardAvoidingView,
  RefreshControl,
  Platform
} from "react-native";
import axios from "axios";
import store from "../../mobxState/store";
import { Avatar, Button, Card, Title, Paragraph, List, Searchbar } from "react-native-paper";
import Dialog from "./dialog";

//icons from
// https://materialdesignicons.com/

const PackageImg = (props) => (
  <Avatar.Icon {...props} icon="package-variant-closed" style={{ height: 50, width: 50 }} />
);

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

function OpenOrderList(props) {
  // const [orders, SetOrders] = React.useState(store.orders);
  const [searchQuery, setSearchQuery] = React.useState(store.orders);
  const [visible, setVisible] = React.useState(false);
  const [order, setOrder] = React.useState({});

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(async () => { await store.openOrders(); setSearchQuery(store.orders) }).then(() => setRefreshing(false));
  }, []);

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
    {
      searchQuery.length == 0 && setSearchQuery(store.orders);
    }
  }, []);

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}
    >
      <View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
          <List.AccordionGroup>
            <Searchbar
              placeholder="מספר משלוח"
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
                  <Card.Content style={styles.openCard} key={props.key}>
                    <View style={styles.buttonsOpt}>
                      <Button
                        icon="phone-outgoing-outline"
                        mode="contained"
                        onPress={() => Linking.openURL(`tel:${order.phone}`)}
                      >
                        חייג
                      </Button>
                      <Button
                        icon="waze"
                        mode="contained"
                        onPress={() => Linking.openURL(`https://waze.com/ul?q=${order.city}%20${order.address}%20${"20"}`)}
                      >
                        נווט
                      </Button>
                      <Button icon="update" mode="contained" onPress={() => setVisible(true)}>
                        עדכון
                      </Button>
                    </View>
                    <Paragraph style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}>
                      {" "}
                      מועד משלוח {`${order.delivery_date} ${order.delivery_time} `}
                    </Paragraph>
                  </Card.Content>
                </List.Accordion>,
              ];
            })}
          </List.AccordionGroup>
        </ScrollView>

        {visible && <Dialog closed={(bool) => setVisible(bool)} parm={order} />}
      </View>
    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  scrollView: {},
  // container: {
  //   flex: 1
  // },
  containerList: {
    direction: "rtl",
    borderRadius: 80,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "white",
    margin: 5,
  },

  buttonsOpt: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  openCard: {},
  Button: {
    width: 20,
  },
});

export default OpenOrderList;
