import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, I18nManager,Linking } from 'react-native';
import axios from "axios";
import store from "../../mobxState/store";
import { Avatar, Button, Card, Title, Paragraph, List } from 'react-native-paper';


//icons from 
// https://materialdesignicons.com/

const PackageImg = props => <Avatar.Icon {...props} icon="package-variant-closed" style={{ height: 50, width: 50 }} />

let PhasenModal = (props) => {
	return (
		<Card.Content style={styles.openCard} key={props.key} >
			<View style={styles.buttonsOpt}>

				<Button icon="phone-outgoing-outline" mode="contained" onPress={() => Linking.openURL(`tel:0502419634`)}>
					חייג
				</Button>
				<Button icon="waze" mode="contained" onPress={() => console.log('Pressed')}>
					נווט
				</Button>
				<Button icon="update" mode="contained" onPress={() => console.log('Pressed')}>
					עדכון
				</Button>
			</View>
			<Paragraph style={{ textAlign: "center" }} >  מועד משלוח         {`${props.orderTime} ${props.orderDate} `}</Paragraph>

		</Card.Content>
	);
}



function OrderList(props) {

	const [orders, SetOrders] = React.useState(store.orders);


	React.useEffect(() => {
		{ orders.length == 0 && SetOrders(store.orders) }
		// console.log(store.orders);
	}, []);




	return (
		<View>
			<ScrollView style={styles.scrollView}>
				<List.AccordionGroup>
					{orders != [] && orders?.map((order, i) => {
						return [
							<List.Accordion style={styles.containerList} title={` מ' ${order.order_number} - ${order.address} ${order.city} `} id={`${i}`} left={PackageImg}>
								<PhasenModal key={i} orderDate={`${order.delivery_date}`} orderTime={`${order.delivery_time}`} />
							</List.Accordion>
						];
					})}
				</List.AccordionGroup>
				{/* {orders != [] && orders?.map((order, i) => {
					return [
						<TouchableOpacity >
							<Card style={styles.containerList} >
								<Card.Title title={`משלוח ${order.order_number}`} subtitle={`${order.address} ${order.city} ${i} ${order.area}`} left={PackageImg} />
								<PhasenModal key={i} orderDate={`${order.delivery_date}`} orderTime={`${order.delivery_time}`} />
							</Card>
						</TouchableOpacity>
					];
				})
				} */}

			</ScrollView>

		</View>
	);
}

const styles = StyleSheet.create({
	scrollView: {
	},
	containerList: {
		direction: "rtl",
	},
	openCard: {
		backgroundColor: "white"
		// display: "none"
	},
	buttonsOpt: {
		flex: 1,
		marginTop: 10,
		marginBottom: 10,
		alignItems: "center",
		justifyContent: "space-around",
		flexDirection: "row"
	},
	Button: {
		width: 20
	}

});

export default OrderList;


