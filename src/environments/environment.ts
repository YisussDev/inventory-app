export const environment = {
  url: "http://18.230.153.132:3000/api/",
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
    uri: "http://18.230.153.132:3000/api/",
    login: {
      api_resource: 'login'
    },
    verify: {
      api_resource: 'verify-token'
    }
  },
};
