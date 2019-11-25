import React, { Component } from "react";
import { appDidMount, appWillUnmount } from "./actions";

import HomeContainer from "./containers/home-container";
import IntroContainer from "./containers/intro-container";
import { NavigationNativeContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import QRCodeCreateAccountContainer from "./containers/qrcode-create-account-container";
import SplashScreenContainer from "./containers/splash-screen-container";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

const AppBuilder = store =>
  class App extends Component {
    componentDidMount() {
      store.dispatch(appDidMount());
    }

    componentWillUnmount() {
      store.dispatch(appWillUnmount());
    }

    render() {
      return (
        <Provider store={store}>
          <NavigationNativeContainer>
            <Navigator
              initialRouteName="SplashScreen"
              headerMode="none"
              screenOptions={{ gestureEnabled: true }}>
              <Screen name="SplashScreen" component={SplashScreenContainer} />
              <Screen name="Intro" component={IntroContainer} />
              <Screen name="Home" component={HomeContainer} />
              <Screen
                name="CreateAccount"
                component={QRCodeCreateAccountContainer}
                options={{
                  gesturesEnabled: true,
                  gestureDirection: "horizontal",
                  animation: "spring",
                }}
              />
            </Navigator>
          </NavigationNativeContainer>
        </Provider>
      );
    }
  };

export default AppBuilder;
