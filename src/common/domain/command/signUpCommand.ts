export type SignUpCommand = {
  companyName: string;
  primaryFirstName: string;
  primaryLastName: string;
  PrimaryPhonNumber: string;
  businessEmail: string;
  position: string;
  secondaryFirstName?: string;
  secondaryLastName?: string;
  secondaryPhoneNumber?: string;
  referredBy?: string;
  accountNumber?: string;
  password: string;
  rePassword: string;
  type: number;
};
