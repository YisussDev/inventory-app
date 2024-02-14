export const environment = {
  url: "http://localhost:3005/api/",
  production: false,
  user_service: {
    users: {
      api_resource: 'users',
    }
  },
  product_service: {
    api_resource: 'products'
  },
  provider_service: {
    api_resource: 'providers'
  },
  sale_service: {
    api_resource: 'sales'
  },
  audit_service: {
    api_resource: 'audits'
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
