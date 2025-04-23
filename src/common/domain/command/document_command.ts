export class DocumentCommand {
  BusinessLicense?: File | null;
  HealthDepartmentCertificate?: File | null;
  constructor(
    BusinessLicense?: File | null,
    HealthDepartmentCertificate?: File | null
  ) {
    this.BusinessLicense = BusinessLicense;
    this.HealthDepartmentCertificate = HealthDepartmentCertificate;
  }
}
