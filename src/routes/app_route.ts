export const APP_ROUTES = {
    Splash: "/",
    Login: "/login",
    SignUp: "/login/signUp",
    SignUpDetail: "/signup-details",
    Dashboard: "/dashboard",
    Activation: "/activation",
    EditProfile: "/dashboard/profileEdit",
    ShoppingCard: "/dashboard/shoppingCart",
    Invoices: "/dashboard/:oprAddress/invoices",
    Requests: "/dashboard/:oprAddress/requests",
    Service: "/dashboard/:oprAddress/services",
    Enrollservice: "/dashboard/:oprAddress/enrollservice",
    EnrollEmergencyService: "/dashboard/:oprAddress/emergency",
    ServiceItem: "/dashboard/serviceItem",
    ServiceItemEmergency: "/dashboard/serviceItemEmergency",
    Address: "/dashboard/newAddress",
};

export const buildRoute = (route: string, params: Record<string, string>) => {
  let result = route;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`:${key}`, value);
  });
  return result;
};