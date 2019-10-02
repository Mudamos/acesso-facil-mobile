import { Defs, Mask, Rect, Svg } from "react-native-svg";
import { Dimensions, StyleSheet, View } from "react-native";

import React from "react";

const { width: windowWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  extension: {
    width: windowWidth,
    flexGrow: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

const QRCodeMask = ({ opacity }) => (
  <View style={styles.container}>
    <View
      style={[
        styles.extension,
        { backgroundColor: `rgba(0, 0, 0, ${opacity})` },
      ]}
    />
    <View style={{ flexBasis: windowWidth }}>
      <Svg
        height={windowWidth}
        width={windowWidth}
        viewBox={`0 0 ${windowWidth} ${windowWidth}`}>
        <Defs>
          <Mask id="mask" height="100%" width="100% ">
            <Rect height="100%" width="100%" fill="#fff" />
            <Rect height="60%" width="60%" fill="#000" x="20%" y="20%" />
          </Mask>
        </Defs>
        <Rect
          height="100%"
          width="100%"
          mask="url(#mask)"
          fill={`rgba(0, 0, 0, ${opacity})`}
          fill-opacity="0"
        />
      </Svg>
    </View>
    <View
      style={[
        styles.extension,
        { backgroundColor: `rgba(0, 0, 0, ${opacity})` },
      ]}
    />
  </View>
);

QRCodeMask.defaultProps = {
  opacity: 0.5,
};

export default QRCodeMask;
