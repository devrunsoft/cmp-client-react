export class OperationalAddressCommand {
    Name: string;
    Address: string;
    CrossStreet: string;
    County: string;
    LocationPhone: string;
    BusinessId: number;
    FirstName: string;
    LastName: string;
    Lat: number;
    Long: number;
    constructor(
        Name: string,
        Address: string,
        CrossStreet: string,
        County: string,
        LocationPhone: string,
        BusinessId: number,
        FirstName: string,
        LastName: string,
        Lat: number,
        Long: number
    ) {
        this.Name = Name;
        this.Address = Address;
        this.CrossStreet = CrossStreet;
        this.County = County;
        this.LocationPhone = LocationPhone;
        this.BusinessId = BusinessId;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Lat = Lat;
        this.Long = Long;
    }
}
