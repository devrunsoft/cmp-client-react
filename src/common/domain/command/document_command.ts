
export class DocumentCommand {
    BusinessLicense: File;
    HealthDepartmentCertificate: File;
    constructor(
        BusinessLicense: File,
        HealthDepartmentCertificate: File,
    ) {
        this.BusinessLicense = BusinessLicense;
        this.HealthDepartmentCertificate = HealthDepartmentCertificate;

    }
}
