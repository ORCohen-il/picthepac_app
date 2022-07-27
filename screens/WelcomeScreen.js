import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Button,
  ToastAndroid,
  Alert,
  Linking,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import store from "../mobxState/store";
import { Notif } from "../models/notif";

function WelcomeScreen({ navigation }) {
  const [username, onChangeUsername] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [isloading, loading] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  const baseUrl = "http://143.47.232.141:9050";

  const checkLogin = async () => {
    loading(true);
    store
      .Login(username, password)
      .then((res) => {
        if (res) {
          navigation.navigate("Home");
          loading(!res);
          ToastAndroid.show(`login Success`, ToastAndroid.BOTTOM);
        } else {
          ToastAndroid.show(`login failed`, ToastAndroid.BOTTOM);
          loading(false);
        }
      })
      .catch((err) => {
        ToastAndroid.show(`${Notif.NETWORK_ERROR}`, ToastAndroid.BOTTOM);
        loading(false);
        return;
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <Image source={require("../assets/banner.jpg")} style={styles.banner} />
      </View>

      <View style={styles.containerBody}>
        <View style={styles.top}>
          {isloading && (
            <View style={styles.box_loading}>
              <Image source={require("../assets/gif/loading.gif")} style={styles.image_loading} resizeMode={"cover"} />
            </View>
          )}
        </View>
        <View style={styles.middle}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeUsername}
            value={username}
            placeholder="Username"
            keyboardType="default"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            placeholder="Password"
            keyboardType="default"
          />
          <View style={styles.logbtn}>
            <Button disabled={false} title="Login" onPress={() => checkLogin()} />
          </View>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.footerText} onPress={() => Linking.openURL(supportedURL)}>
            THE APP DEV & DESIGN BY OR COHEN
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight - 40 : 0,
    flex: 1,
    backgroundColor: "#f5b042",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  logbtn: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    color: "#841584",
  },
  banner: {
    margin: 5,
    borderRadius: 15,
    width: window.width,
    height: 90,
  },
  box_loading: {
    alignItems: "center",
    borderRadius: 60,
    width: "20%",
    height: "110%",
    backgroundColor: "blue",
    borderWidth: 2,
    opacity: 0.8,
  },
  image_loading: {
    marginTop: 10,
    width: 60,
    height: 60,
    borderRadius: 250,
    borderWidth: 2,
  },
  containerBody: {
    flex: 1,
    justifyContent: "space-between",
    padding: 1,
    margin: 5,
  },
  top: {
    marginTop: 35,
    flex: 0.15,
    alignItems: "center",
    // borderWidth: 5,
  },
  middle: {
    flex: 0.8,
    justifyContent: "center",
    // backgroundColor: "beige",
    // borderWidth: 5,
  },
  bottom: {
    flex: 0.25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  // icons: {
  // 	flex: 1,
  // 	flexWrap: "wrap",
  // 	flexDirection: "row",
  // },
  // iconClick: {
  // 	resizeMode: "cover",
  // 	marginTop: 1,
  // 	margin: 26,
  // 	width: 60,
  // 	height: 60,
  // 	borderRadius: 100
  // },
  input: {
    fontWeight: "bold",
    color: "#080808",
    fontSize: 20,
    height: 40,
    margin: 20,
    opacity: 0.8,
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#FFFF",
    textAlign: "center",
  },
  footerText: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    flex: 1,
    color: "#ff0000",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WelcomeScreen;

// const checkLogin = async () => {
// 	// navigation.navigate('Home')
// 	loading(true)

// 	setTimeout(() => {
// 		let params = {
// 			email: username,
// 			password: password
// 		}
// 		axios.post(`${baseUrl}/login`, params).then(async (response) => {
// 			if (response.data.loginSuccess) {
// 				console.log(response.data.token);
// 				await AsyncStorage.setItem('@token', response.data.token);
// 				await store.getOrders()
// 				navigation.navigate('Home')
// 			} else {
// 				ToastAndroid.show(`login failed`, ToastAndroid.BOTTOM);
// 			}

// 			loading(false)

// 		});
// 	}, 3000);
// }
