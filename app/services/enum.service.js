import api from "../utils/interceptors";

export const EnumService = {
  getEnumStatues,
};

async function getEnumStatues() {
  const result = await api.get("statuses/enumStatues");
  return result;
}
