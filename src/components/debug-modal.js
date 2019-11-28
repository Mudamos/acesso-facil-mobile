import { DARK_BLUE, WHITE } from "../constants";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect } from "react";
import { isEmpty, isNil } from "ramda";

import Button from "./base/button";
import Modal from "./base/modal";
import PropTypes from "prop-types";
import { SefazAccountPrototype } from "../proptypes";

const isBlank = value => isNil(value) || isEmpty(value);

const styles = StyleSheet.create({
  bold: { fontWeight: "bold" },
  container: {
    justifyContent: "center",
  },
  itemSeparator: {
    backgroundColor: DARK_BLUE,
    minWidth: 1,
    minHeight: 3,
  },
  marginBottom10: { marginBottom: 10 }
});

const DebugModal = ({
  fetchLogs,
  hasLogError,
  logs,
  clearLogs,
  onClose,
  visible,
}) => {
  useEffect(() => {
    fetchLogs();
  }, [visible]);

  if (isBlank(logs) || hasLogError) {
    return (
      <Modal visible={visible} style={styles.container}>
        <Button text="Fechar" onPress={onClose} style={styles.marginBottom10} />
        <Button text="Recarregar" onPress={fetchLogs} />
        <Text>Sem dados</Text>
      </Modal>
    )
  }

  return (
    <Modal visible={visible} style={styles.container}>
      <Button text="Fechar" onPress={onClose} style={styles.marginBottom10} />
      <Button text="Limpar" onPress={clearLogs} />
      <FlatList
        showsVerticalScrollIndicator
        data={logs}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Text><Text style={styles.bold}>requestedAt:</Text> {item.requestedAt}</Text>
            <Text><Text style={styles.bold}>request:</Text> {JSON.stringify(item.request)}</Text>
            <Text><Text style={styles.bold}>responseArrivedAt:</Text> {item.responseArrivedAt}</Text>
            <Text><Text style={styles.bold}>response:</Text> {JSON.stringify(item.response)}</Text>
          </View>
        )}
      />
    </Modal>
)};

DebugModal.propTypes = {
  clearLogs: PropTypes.func.isRequired,
  fetchLogs: PropTypes.func.isRequired,
  hasLogError: PropTypes.bool,
  logs: PropTypes.arrayOf(PropTypes.object),
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

DebugModal.defaultProps = {
  hasLogError: false,
};

export default DebugModal;
