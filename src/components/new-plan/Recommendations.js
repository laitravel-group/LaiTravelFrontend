import React, { useState } from "react";
import { Card, Button, Row, Col, Space } from "antd";
import { Scrollbars } from "rc-scrollbars";
import PlaceDetailsModal from "./PlaceDetailsModal";

const { Meta } = Card;

export default function Recommendations({ recommendedPlaces, addPlace }) {
	const [selectedPlace, setSelectedPlace] = useState(null);
	const [modalVisible, setmodalVisible] = useState(false);

	const handleDetailsClick = (place) => {
		setSelectedPlace(place);
		setmodalVisible(true);
	};

	return (
		<div>
			<Scrollbars
				style={{ height: 400 }}
				renderThumbHorizontal={(props) => (
					<div {...props} className="scrollbar-thumb-horizontal" />
				)}
				autoHide
			>
				<Space size={"large"}>
					{recommendedPlaces.map((place) => (
						<Card
							key={place.placeName}
							hoverable
							onClick={() => handleDetailsClick(place)}
							cover={
								<img
									alt={place.placeName}
									src={place.photo}
									className="recommendation-card-photo"
								/>
							}
							actions={[
								<Button
									key="addPlace"
									onClick={() => addPlace()}
								>
									Add
								</Button>,
							]}
							className="recommendation-card"
						>
							<Meta
								title={place.placeName}
								description={place.description}
							/>
						</Card>
					))}
				</Space>
			</Scrollbars>

			{selectedPlace && (
				<PlaceDetailsModal
					place={selectedPlace}
					isModalVisible={modalVisible}
					setIsModalVisible={setmodalVisible}
				/>
			)}
		</div>
	);
}
