 export const fetchLogs = () => ({
   type: "FETCH_LOGS",
 });

 export const fetchLogsSucess = (logs = []) => ({
   type: "FETCH_LOGS_SUCCESS",
   payload: logs,
 });

 export const fetchLogsError = raw => ({
   type: "FETCH_LOGS_ERROR",
   payload: raw,
 });

 export const clearLogs = raw => ({
   type: "CLEAR_LOGS",
 });
