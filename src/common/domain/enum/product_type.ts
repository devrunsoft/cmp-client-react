// ProductCollection Enum
export enum ProductType {
    Service = 1,
    Product = 2,
    ServiceEmergency = 3
  }
  
  // Description Mapping
  export const ProductTypeDescriptions: Record<ProductType, string> = {
    [ProductType.Service]: "Service",
    [ProductType.Product]: "Product",
    [ProductType.ServiceEmergency]: "ServiceEmergency"
  };
  
