import React, { Component } from "react";
import { appDidMount, appWillUnmount } from "./actions";

import HomeContainer from "./containers/home-container";
import IntroContainer from "./containers/intro-container";
import { NavigationNativeContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import QRCodeCreateAccountContainer from "./containers/qrcode-create-account-container";
import QRCodeLoginContainer from "./containers/qrcode-login-container";
import SplashScreenContainer from "./containers/splash-screen-container";
import { createStackNavigator } from "@react-navigation/stack";
import { log } from "./utils";

const { Navigator, Screen } = createStackNavigator();

const AppBuilder = store =>
  class App extends Component {
    componentDidMount() {
      store.dispatch(appDidMount());
    }

    componentWillUnmount() {
      store.dispatch(appWillUnmount());
    }

    screenOptions = {
      animation: "spring",
    };

    render() {
      return (
        <Provider store={store}>
          <NavigationNativeContainer
            onStateChange={state => log("[react-navigation]: ", state)}>
            <Navigator
              initialRouteName="SplashScreen"
              headerMode="none"
              screenOptions={this.screenOptions}>
              <Screen name="SplashScreen" component={SplashScreenContainer} />
              <Screen name="Intro" component={IntroContainer} />
              <Screen name="Home" component={HomeContainer} />
              <Screen
                name="CreateAccount"
                component={QRCodeCreateAccountContainer}
              />
              <Screen name="Login" component={QRCodeLoginContainer} />
            </Navigator>
          </NavigationNativeContainer>
        </Provider>
      );
    }
  };

export default AppBuilder;
