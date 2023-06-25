const baseURL = "http://localhost:5550";

const groups = "/groups";
const orders = "/orders";
const auth = "/auth";
const comments = "/comments";

const urls = {
  auth: {
    login: `${auth}/login`,
    refresh: `${auth}/refresh`,
  },
  comments: {
    comments,
    post: (orderId: string): string => `${comments}/${orderId}`,
  },
  orders: {
    orders,
    byId: (orderId: string): string => `${orders}/${orderId}`,
  },
  groups: {
    groups,
    post: (orderId: string): string => `${groups}/${orderId}`,
  },
};

export { baseURL, urls };
