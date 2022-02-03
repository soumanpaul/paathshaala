/* eslint-disable react-native/no-inline-styles */
import React,{useEffect} from 'react';
import {View, Image, Dimensions} from 'react-native';
import colors from '../../themes/colors';
import AppAsyncStorage from '../../utils/AppAsyncStorage';
import {ApplicationConstants} from '../../utils/ApplicationConstants';
import * as Keychain from 'react-native-keychain';
const Splash = ({navigation})=>{
  useEffect(() => {
    checkAuthication()
  }, []);
  const checkAuthication = async()=>{
    let moveDashBoard = await AppAsyncStorage.get(
      ApplicationConstants.moveDashBoard,
    );
    if (moveDashBoard != null && moveDashBoard == 'yes') {
      navigation.reset({
        routes: [{name: 'DrawerStack'}],
      });
    } else{
      let mobileNo = await AppAsyncStorage.get(ApplicationConstants.mobileNumber);
      let passwordVal = false;
      try {
        passwordVal = await Keychain.getGenericPassword();
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
  
      console.log('the password value is', passwordVal);
     if (mobileNo != null && passwordVal) {
      navigation.reset({
        routes: [{name: 'LoginContainer'}],
      });
    } else {
      navigation.reset({
        routes: [{name: 'SignUpMobileNoContainer'}],
      });
    }
    }
   

  }
  return(
    <View style={{flex: 1, backgroundColor: colors.white}}>
             <Image
              style={{
                // position: 'absolute',
                // left: 0,
                // top: 0,
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
              }}
              source={require('../../assets/images/launch_screen.jpg')}
            />
          </View>
  )
}
export default Splash;
