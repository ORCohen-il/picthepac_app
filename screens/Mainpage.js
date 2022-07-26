import React from 'react';
import OrderList from "./component/OrderList";
import axios from "axios";
import store from "../mobxState/store";

import {
	StyleSheet, Text, View, StatusBar, SafeAreaView, Image, TouchableOpacity, Dimensions,
	TextInput, Button, ToastAndroid, Alert, Linking, Platform
} from 'react-native';

// const [orders, SetOrders] = React.useState("");

const baseUrl = 'http://143.47.232.141:9050';

const getOpenOrders = async () => {
	// store
	// console.log(store.name);

	await axios.get(`${baseUrl}/deliveries/`, { params: { token: 'K2v6JyyqjbaPKVoxsfWN64', } }).then((response) => {
		// console.log(response.data);
		// SetOrders(response.data)
		// ToastAndroid.show(`${Toast}`, ToastAndroid.CENTER);
	});

}


function Mainpage(props) {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.containerBody}>
				<View style={styles.top} >
					<View style={styles.icons}>
						<TouchableOpacity onPress={getOpenOrders}>
							<Image source={require('../assets/icons/openOrder.png')} style={styles.iconClick} />
						</TouchableOpacity>
						<TouchableOpacity>
							<Image source={require('../assets/banner.jpg')} style={styles.iconClick} />
						</TouchableOpacity>
						<TouchableOpacity>
							<Image source={require('../assets/banner.jpg')} style={styles.iconClick} />
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.middle} >
					<OrderList />
				</View>
			</View>
		</SafeAreaView>
	);





}

const styles = StyleSheet.create({

	container: {
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight - 40 : 0,
		flex: 1,
		backgroundColor: '#f5b042',
	},
	containerBody: {
		flex: 1,
		alignItems: "center"
	},
	top: {
		flex: 0.1,
		width: "100%",
		// marginBottom: "5%",
		// marginTop: "5%",
		paddingTop: 20,
	},
	middle: {
		flex: 0.85,
		width: "100%",
		borderWidth: 4,
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
		borderRadius: 100
	},


});

export default Mainpage;