export interface Inquiry {
  id?: number; // Make sure this property exists
  name: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  country: string;
  jobTitle: string;
  jobDetails: string;
  submittedAt?: Date;
}
