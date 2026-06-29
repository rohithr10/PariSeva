import { Platform } from "react-native";

const PROD_API = "https://api.pariseva.in/v1";

/**
 * Base URL resolution:
 *  - dev (__DEV__): Android emulator reaches the host machine via 10.0.2.2,
 *    iOS simulator via localhost. Real devices should set DEV_API_HOST below
 *    to your machine's LAN IP (e.g. 192.168.1.5).
 *  - production: the hosted API.
 */
//const DEV_API_HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const DEV_API_HOST = "172.16.4.151";

const DEV_API = `http://${DEV_API_HOST}:4000/v1`;

export const Config = {
  API_BASE_URL: __DEV__ ? DEV_API : PROD_API,
  APP_NAME: "My Holy Nest",
  APP_VERSION: "1.0.0",
  RAZORPAY_KEY: "rzp_test_XXXXXXXXXXXXXX",
  SUPPORT_EMAIL: "support@pariseva.in",
  SUPPORT_PHONE: "+91 98765 43210",
  DEFAULT_CURRENCY: "INR",
  DEFAULT_LANGUAGE: "en",
  OTP_LENGTH: 6,
  OTP_TIMEOUT: 60,
  PAGE_SIZE: 20,
};
