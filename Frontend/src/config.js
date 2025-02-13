const config = {
  BASE_URL_AUTH: `http://${process.env.PUBLIC_IP_AUTH}:3001/api/auth/login`,
  BASE_URL_REGISTER: `http://${process.env.PUBLIC_IP_REGISTER}:3002/api/users`,
  BASE_URL_OFFERS: `http://${process.env.PUBLIC_IP_OFFERS}:8080/index.php`,
  BASE_URL_PRODUCT_CREATE: `http://${process.env.PUBLIC_IP_PRODUCT_CREATE}:3006/api/products`,
  BASE_URL_PRODUCT_DELETE: `http://${process.env.PUBLIC_IP_PRODUCT_DELETE}:3009/deleteProduct`,
  BASE_URL_PRODUCT_UPDATE: `http://${process.env.PUBLIC_IP_PRODUCT_UPDATE}:3007/api/products`,
  BASE_URL_PRODUCT: `http://${process.env.PUBLIC_IP_PRODUCT}:3008/api/products`,
  BASE_URL_LOCATIONS: `http://${process.env.PUBLIC_IP_LOCATIONS}:3010/api/locations`,
  BASE_URL_USERS: `http://${process.env.PUBLIC_IP_USERS}:3005/api/users`,
  BASE_URL_USER_UPDATE: `http://${process.env.PUBLIC_IP_USER_UPDATE}:3004/api/users`,
  BASE_URL_USER_DELETE: `http://${process.env.PUBLIC_IP_USER_DELETE}:3003/api/users`,
  BASE_URL_CATEGORIES: `http://${process.env.PUBLIC_IP_CATEGORIES}:4002/api/categories`,
  BASE_URL_CATEGORY_UPDATE: `http://${process.env.PUBLIC_IP_CATEGORY_UPDATE}:4003/api/categories`,
  BASE_URL_CATEGORY_DELETE: `http://${process.env.PUBLIC_IP_CATEGORY_DELETE}:4004/api/categories`,
  BASE_URL_CATEGORY_CREATE: `http://${process.env.PUBLIC_IP_CATEGORY_CREATE}:4001/api/categories`,
  BASE_URL_SCHEDULES: `http://${process.env.PUBLIC_IP_SCHEDULES}:3016/graphql`,
  BASE_URL_SUGGESTIONS: `http://${process.env.PUBLIC_IP_SUGGESTIONS}:3022/api/suggestions`,
  BASE_URL_INVENTORIES: `http://${process.env.PUBLIC_IP_INVENTORIES}:5003/graphql`,
  MQTT_TOPIC: "suggestions"
};

export default config;
