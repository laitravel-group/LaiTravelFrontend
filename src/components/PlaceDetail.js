import React from "react";
import { Modal, Table } from "antd";
import {
	StarOutlined,
	EnvironmentOutlined,
	CommentOutlined,
} from "@ant-design/icons";

const PlaceDetail = ({ place, isModalVisible, setIsModalVisible }) => {
	const capitalize = (str) => {
		if (!str || typeof str !== "string") return "";
		return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
	};

	const dataSource = place.openingHours.map((entry) => {
		return {
			key: entry.day_of_week,
			day: capitalize(entry.day_of_week),
			hours: `${entry.open_time} - ${entry.close_time}`,
		};
	});

	// {
	//   key: place.openingHours[0].day_of_week,
	//   day: capitalize(place.openingHours[0].day_of_week),
	//   hours: `${place.openingHours[0].open_time} - ${place.openingHours[0].close_time}`
	// },

	const columns = [
		{
			title: "Day",
			dataIndex: "day",
			key: "day",
		},
		{
			title: "Opening Hours",
			dataIndex: "hours",
			key: "hours",
		},
	];

	return (
		<Modal
			title={place.placeName}
			open={isModalVisible}
			onOk={() => setIsModalVisible(false)}
			onCancel={() => setIsModalVisible(false)}
		>
			<img alt={place.placeName} src={place.photo} />
			<p>
				<StarOutlined /> Rating: {place.rating}
			</p>
			<p>
				<CommentOutlined /> Description: {place.description}
			</p>
			<p>
				<EnvironmentOutlined /> Address: {place.formattedAddress}
			</p>
			<Table
				dataSource={dataSource}
				columns={columns}
				pagination={false}
			/>
		</Modal>
	);
};

export default PlaceDetail;
