import * as React from "react";
import { Text, View, TextInput, Button, Alert, StyleSheet, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";

import { Paragraph, Dialog, Portal, Provider, Card } from "react-native-paper";

const Update_dialog = (props) => {
  const hideDialog = () => props.closed(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });
  const onSubmit = (data) => console.log(data);

  React.useEffect(() => {});
  return (
    <Provider>
      <View style={styles.continuer}>
        <Portal>
          <Dialog style={{ height: "90%", backgroundColor: "red" }} visible={true} onDismiss={hideDialog}>
            <Dialog.Title style={styles.title}>
              <Image source={require("../../assets/icons/open-box.png")} style={styles.img} />
            </Dialog.Title>
            <Dialog.Content style={styles.content}>
              <View style={styles.formBox}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} />
                  )}
                  name="firstName"
                />
                {errors.firstName && <Text>This is required.</Text>}

                <Controller
                  control={control}
                  rules={{
                    maxLength: 100,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} />
                  )}
                  name="lastName"
                />

                <Button title="Submit" onPress={handleSubmit(onSubmit)} />
              </View>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  continuer: { flex: 1 },
  content: { height: 200 },
  title: {
    height: "30%",
    textAlign: "center",
  },
  formBox: {
    flex: 1,
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  img: {
    resizeMode: "contain",
  },
});

export default Update_dialog;
