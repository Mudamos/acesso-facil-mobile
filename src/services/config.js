import { curry } from "ramda";

const CONFIGS_KEY = "configs";

const fetchConfigs = storage =>
  storage.fetch(CONFIGS_KEY).then(configs => configs || {});

const updateConfigs = curry((storage, configs) =>
  storage.store(CONFIGS_KEY, configs),
);

export default ({ storage }) => ({
  fetchConfigs: () => fetchConfigs(storage),
  updateConfigs: updateConfigs(storage),
});
