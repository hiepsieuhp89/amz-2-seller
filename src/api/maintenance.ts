import { sendGet, sendPut } from "./axios";

export const ConfigMaintenanceModeEndPoint = {
  BASE: "/maintenance-mode",
};


export const getMaintenanceMode = async (): Promise<any> => {
  const res = await sendGet("/maintenance-mode");
  return res.data;
};

// Update maintenance mode status
export const updateMaintenanceMode = async (payload: { isMaintenance: boolean, message?: string | null }): Promise<any> => {
  const res = await sendPut("/maintenance-mode", payload);
  return res.data;
};
