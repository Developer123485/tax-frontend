import api from "../utils/interceptors";

export const TDSDashboardService = {
  getTDSDashboard,
};

async function getTDSDashboard(deductorId) {
  const result = await api.get(
    `TDSDashboard/fetch/${deductorId}`
  );
  return result;
}
