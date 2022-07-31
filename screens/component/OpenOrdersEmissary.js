import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, I18nManager, Linking, RefreshControl } from "react-native";
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

function OpenOrdersEmissary(props) {
  const [searchQuery, setSearchQuery] = React.useState(store.openOrdersEmissary);
  const [visible, setVisible] = React.useState(false);
  const [order, setOrder] = React.useState({});

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(async () => { await store.getOpenEmissary(); setSearchQuery(store.openOrdersEmissary) }).then(() => setRefreshing(false));
  }, []);

  const onChangeSearch = (query) => {
    try {
      let find = store.openOrdersEmissary.find((e) => e.delivery.order_number == query);
      if (find) {
        let seaqur = [...[], find];
        setSearchQuery(seaqur);
      } else {
        setSearchQuery(store.openOrdersEmissary);
      }
    } catch (error) {
      console.log(error);
    }
    12;
  };

  React.useEffect(() => {
    // { searchQuery.length == 0 && setSearchQuery(store.orders) }
  }, []);

  return (
    <View style={{ height: "100%" }}>
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
                title={` מ' ${order.delivery.order_number} - ${order.delivery.address} ${order.delivery.city} `}
                id={`${i}`}
                left={PackageImg}
              >
                <Card.Content style={styles.openCard} key={order.key}>
                  <View style={styles.buttonsOpt}>
                    <Button
                      icon="phone-outgoing-outline"
                      mode="contained"
                      onPress={() => Linking.openURL(`tel:${order.delivery.phone}`)}
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
                    מועד משלוח {`${order.delivery.delivery_date} ${order.delivery.delivery_time} `}
                  </Paragraph>
                </Card.Content>
              </List.Accordion>,
            ];
          })}
        </List.AccordionGroup>
      </ScrollView>
      {visible && <Dialog closed={(bool) => setVisible(bool)} parm={order} />}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {},
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
  Button: {
    width: 20,
  },
});

export default OpenOrdersEmissary;
