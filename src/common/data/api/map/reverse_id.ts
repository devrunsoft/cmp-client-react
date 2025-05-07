import { Either, left, right } from "common/core/either";
import { GOOGLE_MAPS_API_KEY } from "core/src/utils/url";


export async function getAddressFromCoordsApi(
    lat: number,
    lng: number
): Promise<Either<Error, string>> {
    try {
        const apiKey = GOOGLE_MAPS_API_KEY;
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
        );
        const data = await response.json();

        if (data.status === "OK" && data.results.length > 0) {
            return right(data.results[0].formatted_address);
        } else {
            return left(new Error(data.error_message || "Address not found"));
        }
    } catch (error) {
        return left(new Error("Failed to retrieve address"));
    }
}
