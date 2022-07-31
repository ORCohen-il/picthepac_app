import React from "react";
import {
  KeyboardAvoidingView,
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

// import axios from "axios";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import store from "../mobxState/store";
import { Notif } from "../models/notif";

function Login({ navigation }) {
  const [username, onChangeUsername] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [isloading, loading] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  const checkLogin = async () => {
    loading(true);
    store
      .Login(username, password)
      .then((res) => {
        if (res) {
          onChangeUsername("")
          onChangePassword("")
          setMsg("")
          navigation.navigate("Home");
          loading(!res);
          ToastAndroid.show(`login Success`, ToastAndroid.BOTTOM);
        } else {
          ToastAndroid.show(`login failed`, ToastAndroid.BOTTOM);
          setMsg("שם המשתמש או הסיסמה אינם תקינים")
          loading(false);
        }
      })
      .catch((err) => {
        ToastAndroid.show(`${Notif.NETWORK_ERROR}`, ToastAndroid.BOTTOM);
        setMsg("קיימת שגיאה רשת")
        loading(false);
        return;
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <StatusBar style="auto" />
        <View>
          <Image source={require("../assets/banner.jpg")} style={styles.banner} />
        </View>

        <View style={styles.containerBody}>
          <View style={styles.top}>
            {isloading && (
              <View style={styles.box_loading}>
                <Image
                  source={require("../assets/gif/loading.gif")}
                  style={styles.image_loading}
                  resizeMode={"cover"}
                />
              </View>
            )}

          </View>

          <View style={styles.middle}>
            {msg != "" && <Text style={{ textAlign: "center" }}>{msg}</Text>}
            <TextInput
              style={styles.input}
              onChangeText={(e) => { onChangeUsername(String(e)) }}
              value={username}
              placeholder="Username"
              keyboardType="default"
            />
            <TextInput
              style={styles.input}
              onChangeText={(e) => { onChangePassword(String(e)) }}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight - 50 : 0,
    flex: 1,
    backgroundColor: "#f5b042",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  logbtn: {
    alignItems: "center",
    justifyContent: "center",
    color: "#841584",
  },
  banner: {
    margin: 5,
    borderRadius: 15,
    width: window.width,
    height: 150,
  },
  box_loading: {
    marginTop: 30,
    alignItems: "center",
    width: "20%",
  },
  image_loading: {
    width: 220,
    height: 80,
    // borderRadius: 250,
  },
  containerBody: {
    flex: 1,
    justifyContent: "space-between",
    // padding: 1,
    margin: 5,
  },
  top: {
    flex: 0.15,
    alignItems: "center",
    // marginTop: 35,
    // borderWidth: 5,
  },
  middle: {
    flex: 0.65,
    justifyContent: "center",
    // backgroundColor: "beige",
    // borderWidth: 5,
  },
  bottom: {
    flex: 0.15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  input: {
    fontWeight: "bold",
    color: "#080808",
    fontSize: 20,
    height: 50,
    margin: 20,
    opacity: 0.8,
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#FFFF",
    textAlign: "center",
  },
  footerText: {
    fontWeight: "bold",
    // textDecorationLine: "underline",
    flex: 1,
    color: "#ff0000",
    textAlign: "center",
    // alignItems: "center",
    // justifyContent: "center",
  },
});

export default Login;
