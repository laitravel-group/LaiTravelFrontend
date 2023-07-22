import { OpeningHours } from "./openingHours";

export class Place {
	constructor(
		placeId,
		placeName,
		lat,
		lng,
		photo,
		types,
		formattedAddress,
		description,
		rating,
		openingHours
	) {
		this.placeId = placeId;
		this.placeName = placeName;
		this.lat = lat;
		(this.lng = lng), (this.photo = photo);
		this.types = types;
		this.formattedAddress = formattedAddress;
		this.description = description;
		this.rating = rating;
		this.openingHours = openingHours;
	}

	static simpleLocation(lat, lng) {
		return new Place(
			null,
			null,
			lat,
			lng,
			null,
			null,
			null,
			null,
			null,
			null
		);
	}

	static fromGoogleApiPlace(place) {
		return new Place(
			place.id,
			place.displayName,
			place.location.lat(),
			place.location.lng(),
			place.photos.length > 0 ? place.photos[0].getURI() : null,
			place.types,
			place.formattedAddress,
			place.rating,
			OpeningHours.fromGoogleApiOpeningHours(place.openingHours)
		);
	}

	toJsonObject() {
		return {
			place_id: this.placeId,
			place_name: this.placeName,
			lat: this.lat,
			lng: this.lng,
			photo: this.photo,
			types: this.types,
			formatted_address: this.formattedAddress,
			rating: this.rating,
			opening_hours: this.openingHours.map((openingHours) =>
				openingHours.toJsonObject()
			),
		};
	}
}
