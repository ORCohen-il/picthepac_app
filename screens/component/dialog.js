import * as React from "react";
import { Text, View, TextInput, Button, Alert, StyleSheet, Image, Pressable, KeyboardAvoidingView, Platform } from "react-native";
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
      order_num: "",
      status: "1",
      notes: "1",
    },
  });

  const onSubmit = (data) => console.log(data);



  React.useEffect(() => { });
  return (
    <Provider>

        <View style={styles.continuer}>
          <Portal >
            <Dialog style={{ height: "90%" }} visible={true} onDismiss={hideDialog}>
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
                      <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} placeholder={"מספר משלוח"} />
                    )}
                    name="firstName"
                  />
                  {errors.firstName && <Text>This is required.</Text>}
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} placeholder={"סטטוס"} />
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
                      <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} placeholder={"הערות"} />
                    )}
                    name="lastName"
                  />

                  <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.btntext}>עדכן</Text>
                  </Pressable>
                </View>
              </Dialog.Content>

            </Dialog>
          </Portal>
        </View>
    </Provider >
  );
};

const styles = StyleSheet.create({
  continuer: {
    flex: 1,
    height: "100%"
  },
  content: { height: "50%" },
  title: {
    height: "30%",
    textAlign: "center",
  },
  formBox: {
    flex: 1,
    justifyContent: "space-between",
  },
  input: {
    padding: 10,
    margin: 5,
    borderWidth: 2,
    borderRadius: 10,
  },
  img: {
    resizeMode: "contain",
  },
  button: {
    marginTop: "8%",
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  btntext: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }
});

export default Update_dialog;
