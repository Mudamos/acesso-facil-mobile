import { compose, pure, withHandlers, withProps } from "recompose";

import Config from "react-native-config";
import Faq from "../components/faq";
import { Linking } from "react-native";

const enhance = compose(
  withProps(() => ({
    portalUrl: Config.SEFAZ_FAQ,
    phoneNumber: Config.SEFAZ_PHONE_NUMBER,
  })),
  withProps(({ portalUrl, phoneNumber }) => ({
    portalUrlFormatted: portalUrl.replace(/(http\:\/\/|https\:\/\/)/, ""),
    phoneNumberFormatted: phoneNumber.replace(
      /(\d{2})(\d{4})(\d{4})/,
      "($1) $2-$3",
    ),
  })),
  withHandlers({
    onPortalPress: ({ portalUrl }) => () =>
      Linking.canOpenURL(portalUrl).then(
        isSupported => isSupported && Linking.openURL(portalUrl),
      ),
    onPhonePress: ({ phoneNumber }) => () =>
      Linking.canOpenURL(`tel:${phoneNumber}`).then(
        isSupported => isSupported && Linking.openURL(`tel:${phoneNumber}`),
      ),
  }),
  pure,
);

export default enhance(Faq);
