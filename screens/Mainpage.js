import React from 'react';
import OrderList from "./component/OrderList";
import OpenOrders from "./component/OpenOrders";
import axios from "axios";
import store from "../mobxState/store";

import {
	StyleSheet, Text, View, StatusBar, SafeAreaView, Image, TouchableOpacity, Dimensions,
	TextInput, Button, ToastAndroid, Alert, Linking, Platform
} from 'react-native';



function Mainpage(props) {
	const [screen, SetScreen] = React.useState(0);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.containerBody}>
				<View style={styles.top} >
					<View style={styles.icons}>
						<TouchableOpacity onPress={() => SetScreen(0)}>
							<Image source={require('../assets/icons/list.png')} style={styles.iconClick} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => SetScreen(1)}>
							<Image source={require('../assets/icons/open.png')} style={styles.iconClick} />
						</TouchableOpacity>
						<TouchableOpacity>
							<Image source={require('../assets/icons/to-do-list.png')} style={styles.iconClick} />
						</TouchableOpacity>
					</View>
					<View
						style={{
							borderBottomColor: 'black',
							borderBottomWidth: StyleSheet.hairlineWidth,
						}}
					/>
				</View>

				<View style={styles.middle} >
					{screen === 0 && <OrderList />}
					{screen === 1 && <OpenOrders />}
					{screen === 2 && <OrderList />}
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
		width: "95%",
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