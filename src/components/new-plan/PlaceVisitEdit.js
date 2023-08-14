import {
	Button,
	Dropdown,
	Image,
	Layout,
	List,
	Modal,
	Skeleton,
	Space,
	TimePicker,
} from "antd";
import {
	CalendarOutlined,
	ClockCircleTwoTone,
	DeleteOutlined,
	ExclamationCircleFilled,
	FieldNumberOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";

const { confirm } = Modal;
const fallbackSrc = `data:image/png;base64,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`;

export default function PlaceVisitEdit({ tripPlan, currentDay }) {
	const [listRerenderTrigger, setListRerenderTrigger] = useState(false);

	const numDays = tripPlan.endDate.diff(tripPlan.startDate, "day") + 1;
	const createDaysList = () => {
		const list = [];
		for (let i = 0; i < numDays; i++) {
			list.push({
				key: i.toString(),
				label: (
					<span>
						<CalendarOutlined />{" "}
						{[tripPlan.startDate.add(i, "day").format("MMM Do")]}
					</span>
				),
			});
		}
		return list;
	};
	const daysList = createDaysList();
	const placeData = tripPlan.details[currentDay].visits.map(
		(placeVisitDetails, i) => ({
			index: i,
			title: placeVisitDetails.place.placeName,
			description: placeVisitDetails.place.description,
			photo: placeVisitDetails.place.photo,
		})
	);

	const optionItem = [
		{
			key: "00",
			label: "Open on map",
		},
		{
			key: "01",
			label: "Move to",
			children: daysList,
		},
		{
			key: "02",
			label: (
				<span>
					Delete <DeleteOutlined />
				</span>
			),
		},
	];

	const handleOptionsClick = (placeIndex, clickedRowIndex) => {
		if (clickedRowIndex === "00") {
			console.log("Open on map");
		} else if (clickedRowIndex === "02") {
			showDeleteConfirm(placeIndex);
		} else {
			movePlace(placeIndex, clickedRowIndex);
		}
	};
	const showDeleteConfirm = (placeIndex) => {
		confirm({
			title:
				"Delete " +
				tripPlan.details[currentDay].visits[placeIndex].place.placeName,
			icon: <ExclamationCircleFilled />,
			content: "Are you sure to delete this place?",
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			onOk() {
				tripPlan.details[currentDay].visits.splice(placeIndex, 1);
				setListRerenderTrigger(!listRerenderTrigger);
			},
			onCancel() {},
		});
	};

	const movePlace = (placeIndex, selectedDay) => {
		const moving = tripPlan.details[currentDay].visits[placeIndex];
		tripPlan.details[parseInt(selectedDay)].visits.push(moving);
		tripPlan.details[currentDay].visits.splice(placeIndex, 1);
		setListRerenderTrigger(!listRerenderTrigger);
	};

	const parseMinute = (minute) => {
		if (minute === null) {
			return null;
		}
		return tripPlan.startDate.hour(minute / 60).minute(minute % 60);
	};
	const setStayDuration = (newStayDurationDayjs, placeVisitIndex) => {
		if (newStayDurationDayjs === null) {
			tripPlan.details[currentDay].visits[placeVisitIndex].stayDuration =
				null;
			setListRerenderTrigger(!listRerenderTrigger);
			return;
		}
		const newStayDuration =
			newStayDurationDayjs.hour() * 60 + newStayDurationDayjs.minute();
		tripPlan.details[currentDay].visits[placeVisitIndex].stayDuration =
			newStayDuration;
		setListRerenderTrigger(!listRerenderTrigger);
	};

	// subcomponent
	function OptionButton({ place }) {
		return (
			<Dropdown
				menu={{
					items: optionItem,
					onClick: (e) => handleOptionsClick(place.index, e.key),
				}}
				trigger={["click"]}
				arrow={{
					pointAtCenter: true,
				}}
			>
				<Button type="primary">Options</Button>
			</Dropdown>
		);
	}

	function CustomizedTimePicker({ place }) {
		return (
			<Space.Compact block>
				<ClockCircleTwoTone twoToneColor="#ffde59" />
				<TimePicker
					style={{
						width: 150,
					}}
					suffixIcon={null}
					placeholder="Add Time Duration"
					bordered={false}
					format="H:mm"
					showNow={false}
					value={parseMinute(
						tripPlan.details[currentDay].visits[place.index]
							.stayDuration
					)}
					onChange={(e) => {
						setStayDuration(e, place.index);
					}}
				/>
			</Space.Compact>
		);
	}

	return (
		<Layout
			style={{
				height: "40vh",
				overflow: "auto",
			}}
		>
			<List
				itemLayout="vertical"
				size="large"
				dataSource={placeData}
				renderItem={(place) => (
					<List.Item
						key={place.title}
						extra={
							<Image
								src={place.photo ? place.photo : "error"}
								width={240}
								height={160}
								fallback={fallbackSrc}
								placeholder={<Skeleton active />}
								style={{ objectFit: "cover" }}
							/>
						}
					>
						<List.Item.Meta
							avatar={
								<Space.Compact block>
									<FieldNumberOutlined />
									{place.index + 1}
								</Space.Compact>
							}
							title={
								<Space>
									{place.title}
									<OptionButton place={place} />
								</Space>
							}
							description={
								<Space direction="vertical">
									<CustomizedTimePicker place={place} />
									{place.description}
								</Space>
							}
						/>
					</List.Item>
				)}
			/>
		</Layout>
	);
}
