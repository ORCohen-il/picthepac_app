import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, I18nManager, Linking, KeyboardAvoidingView } from "react-native";
import axios from "axios";
import store from "../../mobxState/store";
import { Avatar, Button, Card, Title, Paragraph, List, Searchbar } from "react-native-paper";

function Settings(props) {

	const list = {
		name: "ROY",
		id: "5465666",
		phone: "055465465",
		mail: "roy.g@018.co.il"
	}

	return (
		<View style={styles.container}>
			<View style={styles.hr} />
			<Card style={styles.boxOne}>
				<Card.Content style={{ alignItems: "center" }} >
					<Title>Card title</Title>
					<Paragraph>Card content</Paragraph>
				</Card.Content>
				{/* <Card.Actions>
					<Button>Cancel</Button>
					<Button>Ok</Button>
				</Card.Actions> */}
			</Card>
			<View style={styles.hr} />
			<Card style={styles.boxTwo}>
				<Card.Content >
					<Title>Card title</Title>
					<Paragraph>Card content</Paragraph>
				</Card.Content>
			</Card>
			<View style={styles.hr} />
			<Card style={styles.boxThree}>
				<Card.Content>
					<Title>Card title</Title>
					<Paragraph>Card content</Paragraph>
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
		textAlign: "center"
	},
	boxTwo: {
		flex: 0.3,
		borderWidth: 2,
	},
	boxThree: {
		flex: 0.3,
		borderWidth: 2,
	},
	hr: {
		padding: 4,
		borderBottomColor: 'black',
		borderBottomWidth: StyleSheet.hairlineWidth,
	}

});

export default Settings;
