export const environment = {
  url: "http://localhost:3005/api/",
  production: true,
  user_service: {
    account: {
      api_resource: 'accounts',
      api_list: 'account-list'
    }
  },
  auth: {
    uri: "http://localhost:3005/api/",
    login: {
      api_resource: 'login'
    },
    verify: {
      api_resource: 'verify-token'
    }
  },
};
