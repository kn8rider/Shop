import React, {Component} from 'react';
import {StyleSheet, Text, Image} from 'react-native';
import {View} from 'react-native-animatable';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Title,
  TextInput,
  Button,
  RadioButton,
  Appbar,
  Portal,
  Modal,
  Provider,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import color from '../colors/colors';

export default class Order extends Component {
  constructor() {
    super();
    this.state = {
      first: 'unchecked',
      second: 'unchecked',
      third: 'unchecked',
      modalVisible: false,
    };
  }
  toggleModal(visible) {
    this.setState({modalVisible: visible});
  }
  one = () => {
    this.setState({first: 'checked', second: 'unchecked', third: 'unchecked'});
  };
  two = () => {
    this.setState({second: 'checked', first: 'unchecked', third: 'unchecked'});
  };
  three = () => {
    this.setState({third: 'checked', second: 'unchecked', first: 'unchecked'});
  };

  render() {
    return (
      <Provider>
        <SafeAreaView style={{flex: 1}}>
          <Appbar.Header style={{backgroundColor: color.MintyGreenMedium}}>
            <Appbar.BackAction
              onPress={() => {
                this.props.navigation.navigate('MyCart');
              }}
            />
            <Appbar.Content title="Address" />
          </Appbar.Header>
          <ScrollView>
            <View style={styles.upContainer}>
              <Title style={styles.title}>Fill your address</Title>
              <TextInput
                label="Full name"
                mode="outlined"
                theme={{
                  colors: {text: color.black, primary: color.MintyGreenDark},
                }}
                style={styles.text}></TextInput>
              <TextInput
                label="Mobile number"
                mode="outlined"
                theme={{
                  colors: {text: color.black, primary: color.MintyGreenDark},
                }}
                style={styles.text}></TextInput>
              <TextInput
                label="PIN code"
                mode="outlined"
                theme={{
                  colors: {text: color.black, primary: color.MintyGreenDark},
                }}
                style={styles.text}></TextInput>
              <TextInput
                label="Flat, House no, Buildind,Apartment"
                mode="outlined"
                theme={{
                  colors: {text: color.black, primary: color.MintyGreenDark},
                }}
                style={styles.text}></TextInput>
              <TextInput
                label="Area, Colony, Street, Sector, Village"
                mode="outlined"
                theme={{
                  colors: {text: color.black, primary: color.MintyGreenDark},
                }}
                style={styles.text}></TextInput>
              <TextInput
                label="Landmark"
                mode="outlined"
                theme={{
                  colors: {text: color.black, primary: color.MintyGreenDark},
                }}
                style={styles.text}></TextInput>
              <TextInput
                label="Town/City"
                mode="outlined"
                theme={{
                  colors: {text: color.black, primary: color.MintyGreenDark},
                }}
                style={styles.text}></TextInput>
              <TextInput
                label="State"
                mode="outlined"
                theme={{
                  colors: {text: color.black, primary: color.MintyGreenDark},
                }}
                style={styles.text}></TextInput>
              <Button
                style={styles.addressBtn}
                onPress={() => console.log('Address saved')}>
                {' '}
                Save Address
              </Button>
              <Title style={styles.payOption}>Choose your payment option</Title>
              <View style={styles.payment}>
                <View style={styles.radiobtn}>
                  <RadioButton
                    value="first"
                    status={this.state.first}
                    onPress={() => this.one()}
                  />
                  <Text style={styles.rdText}>COD (Cash on delivery)</Text>
                </View>
                <View style={styles.radiobtn}>
                  <RadioButton
                    value="second"
                    status={this.state.second}
                    onPress={() => this.two()}
                  />
                  <Text style={styles.rdText}>Debit/Credit Cards</Text>
                </View>
                <View style={styles.radiobtn}>
                  <RadioButton
                    value="third"
                    status={this.state.third}
                    onPress={() => this.three()}
                  />
                  <Text style={styles.rdText}>Payments using UPI/Wallet</Text>
                </View>
              </View>
              <Button
                style={styles.placeOrder}
                onPress={() => {
                  this.toggleModal(true);
                }}>
                Place order
              </Button>

              <Portal>
                <Modal
                  onDismiss={() => {
                    this.toggleModal(false);
                  }}
                  visible={this.state.modalVisible}>
                  <View style={styles.modalViewContainer}>
                    <View style={styles.gif}>
                      <Image
                        source={require('../images/gif.gif')}
                        style={styles.img}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={styles.text2}>
                      Your Order Placed Succesfully !
                    </Text>
                  </View>
                  <Button
                    mode="contained"
                    style={{
                      backgroundColor: color.MintyGreenDark,
                      marginTop: 50,
                      width: 250,
                      alignSelf: 'center',
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      this.toggleModal(false);
                      this.props.navigation.navigate('Products');
                    }}>
                    Browse More Products
                  </Button>
                </Modal>
              </Portal>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    marginBottom: '5%',
    fontSize: 18,
  },
  addressBtn: {
    backgroundColor: color.fadedblue,
  },
  radiobtn: {
    flex: 1,
    flexDirection: 'row',
    marginTop: '5%',
  },
  rdText: {
    fontSize: 20,
    marginTop: '1%',
    marginLeft: '2%',
  },
  payment: {
    borderColor: color.black,
    borderWidth: 1,
    paddingBottom: '5%',
    borderRadius: 8,
    marginVertical: '5%',
  },
  payOption: {
    marginTop: '5%',
    fontWeight: 'bold',
  },
  placeOrder: {
    backgroundColor: color.burntyellow,
    borderBottomColor: 5,
    marginVertical: '5%',
  },
  upContainer: {
    flex: 1,
    padding: '5%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: '5%',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#ede3f2',
    padding: 100,
  },
  gif: {
    width: '100%',
    height: 200,
  },
  img: {
    height: null,
    width: null,
    flex: 1,
  },
  text2: {
    color: 'red',
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign:'center'
  },

  modalViewContainer: {
    backgroundColor: color.white,
    marginHorizontal: '5%',
    borderRadius: 10, 
  },
});
