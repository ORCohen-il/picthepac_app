import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  I18nManager,
  Linking,
  KeyboardAvoidingView,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";
import store from "../../mobxState/store";
import { Avatar, Button, Card, Title, Paragraph, List, Searchbar } from "react-native-paper";

function Settings(props) {
  const Content1 = (props) => <Avatar.Icon {...props} icon="account-cog" />;
  const Content2 = (props) => <Avatar.Icon {...props} icon="clipboard-list" />;
  const Content3 = (props) => <Avatar.Icon {...props} icon="account-cog" />;

  const logout = () => {
    props.navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.hr} />
      <TouchableWithoutFeedback onPress={() => alert("לעדכון פרטים יש לפנות לתמיכה")}>
        <Card style={styles.boxOne}>
          <Card.Title title="הגדרות" subtitle="פרטי משתמש" left={Content1} />
          <Card.Content style={styles.content}>
            <Paragraph>{`משתמש : ${store.EmDetails.name}`}</Paragraph>
            <Paragraph>{`מזהה : ${store.EmDetails.aid}`}</Paragraph>
            <Paragraph>{`מייל : ${store.EmDetails.email}`}</Paragraph>
          </Card.Content>
        </Card>
      </TouchableWithoutFeedback>

      <View style={styles.hr} />
      <Card style={styles.boxTwo}>
        <Card.Title title="כמות משלוחים יומי" subtitle=" " left={Content2} />
        <Card.Content style={{ alignItems: "center" }}>
          <Title>{store.openOrdersEmissary.length}</Title>
          {/* <Paragraph>Card content</Paragraph> */}
        </Card.Content>
      </Card>
      <View style={styles.hr} />
      <Card style={styles.boxThree}>
        <Card.Title title="תמיכה" left={Content3} />
        <Card.Content style={styles.content}>
          {/* <Paragraph>{`משתמש : ${User.name}`}</Paragraph>
					<Paragraph>{`מזהה : ${User.aid}`}</Paragraph>
					<Paragraph>{`מייל : ${User.mail}`}</Paragraph> */}
        </Card.Content>
      </Card>
      <View style={styles.hr} />
      <Card style={styles.boxFour}>
        <Card.Content>
          {/* <Pressable style={styles.button} >
						<Text style={styles.btntext}>עדכן</Text>
					</Pressable> */}
          <Button icon="logout-variant" mode="contained" onPress={() => logout()}>
            <Text>Logout</Text>
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:"space-around"
  },
  boxOne: {
    flex: 0.3,
    borderWidth: 2,
    textAlign: "center",
  },
  boxTwo: {
    flex: 0.25,
    borderWidth: 2,
  },
  boxThree: {
    flex: 0.3,
    borderWidth: 2,
  },
  boxFour: {
    flex: 0.15,
    justifyContent: "center",
    borderWidth: 2,
  },
  hr: {
    padding: 4,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  // button: {
  // 	padding: 10,
  // 	alignItems: 'center',
  // 	justifyContent: 'center',
  // 	paddingVertical: 12,
  // 	paddingHorizontal: 32,
  // 	borderRadius: 4,
  // 	elevation: 3,
  // 	backgroundColor: 'black',
  // },
  // btntext: {
  // 	fontSize: 16,
  // 	lineHeight: 21,
  // 	fontWeight: 'bold',
  // 	letterSpacing: 0.25,
  // 	color: 'white',
  // }
});

export default Settings;
