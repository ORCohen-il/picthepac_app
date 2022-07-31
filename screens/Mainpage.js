import React from "react";
import OpenOrderList from "./component/OpenOrderList";
import OpenOrdersEmissary from "./component/OpenOrdersEmissary";
import Settings from "./component/Settings";
import Dialog from "./component/dialog";

import axios from "axios";
import store from "../mobxState/store";

import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  Button,
  ToastAndroid,
  Alert,
  Linking,
  Platform,
} from "react-native";

function Mainpage({ props, navigation }) {
  const [screen, SetScreen] = React.useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerBody}>
        <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding" : "height"} style={styles.containerBody}>
          {/* <KeyboardAvoidingView behavior='position' style = {{backgroundColor: 'white', flex: 1}}> */}
          <View style={styles.top}>
            <View style={styles.icons}>
              <TouchableOpacity onPress={() => SetScreen(0)}>
                <Image source={require("../assets/icons/list.png")} style={styles.iconClick} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => SetScreen(1)}>
                <Image source={require("../assets/icons/to-do-list.png")} style={styles.iconClick} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => SetScreen(2)}>
                <Image source={require("../assets/icons/Settings-icon.png")} style={styles.iconClick} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.middle}>
            {screen === 0 && <OpenOrderList />}
            {screen === 1 && <OpenOrdersEmissary />}
            {screen === 2 && <Settings navigation={navigation} />}
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight - 40 : 0,
    flex: 1,
    backgroundColor: "#f5b042",
  },
  containerBody: {
    flex: 1
  },
  top: {
    flex: 0.12,
    width: "95%",
    paddingTop: 20,
    // borderWidth: 4,
  },
  middle: {
    flex: 0.92,
    width: "100%",
    padding: 10,
    borderRadius: 100,
    // borderWidth: 4,
  },
  icons: {
    flex: 1,
    marginStart: 10,
    justifyContent: "space-around",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  iconClick: {
    resizeMode: "cover",
    // marginTop: 1,
    // margin: 26,
    width: 60,
    height: 60,
    // borderRadius: 100
  },
});

export default Mainpage;
