import React, { useEffect, useState } from "react";
import {
	AutoComplete,
	Badge,
	Button,
	Dropdown,
	Input,
	Layout,
	notification,
	Space,
	Table,
	TimePicker,
} from "antd";
import {
	CalendarOutlined,
	DeleteOutlined,
	DownOutlined,
	EyeInvisibleOutlined,
	EyeOutlined,
	FieldNumberOutlined,
	ScheduleOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import GoogleMap from "google-maps-react-markers";
import { cloneDeep } from "lodash";
import PageHeader from "../PageHeader";
import ScrollableBox from "../ScrollableBox";
import { apiKey } from "../../key";

const { Content, Footer, Sider } = Layout;
const colors = [
	"pink",
	"lime",
	"yellow",
	"blue",
	"orange",
	"cyan",
	"purple",
	"magenta",
	"green",
	"red",
	"geekblue",
	"volcano",
	"gold",
];

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function NewPlanBuild(props) {
	const [myPosition, setMyPosition] = useState({
		lat: props.cityLocation.lat,
		lng: props.cityLocation.lng,
	});

	const apiHasLoaded = (map, maps) => {
		setMapInstance(map);
		setMapApi(maps);
		setMapApiLoaded(true);
	};

	const handleCenterChange = () => {
		if (mapApiLoaded) {
			setMyPosition({
				lat: mapInstance.center.lat(),
				lng: mapInstance.center.lng(),
			});
		}
	};

	return (
		// Important! Always set the container height explicitly
		<div style={{ height: "100vh" }}>
			<Layout hasSider>
				<Sider
					style={{
						overflow: "auto",
						height: "100vh",
						position: "fixed",
						left: 0,
						top: 0,
						bottom: 0,
						theme: "light",
					}}
					width={"calc(100% - 928px)"}
				>
					<div
						className="site-layout-background"
						style={{
							height: "100%",
							width: "100%",
							padding: 0,
							textAlign: "left",
						}}
					>
						<GoogleMap
							apiKey={apiKey}
							onChange={handleCenterChange}
							defaultCenter={defaultProps.center}
							defaultZoom={defaultProps.zoom}
							yesIWantToUseGoogleMapApiInternals
							onGoogleApiLoaded={({ map, maps }) =>
								apiHasLoaded(map, maps)
							}
						></GoogleMap>
					</div>
				</Sider>
				<Layout
					className="site-layout"
					style={{ marginLeft: "calc(100% - 828px)" }}
				>
					<PageHeader />
					<Content>
						<Input.Group compact>
							<Input
								style={{ width: 240 }}
								placeholder="Search nearby by keyword"
								value={searchKeyword}
								onChange={(e) =>
									setSearchKeyword(e.target.value)
								}
								onPressEnter={() => findMultiLocation()}
							/>
							<Button
								style={{ width: 80 }}
								type="primary"
								onClick={findMultiLocation}
							>
								Search
							</Button>
							<AutoComplete
								value={autoInput}
								options={autoList}
								style={{ width: 428 }}
								onSelect={onSelect}
								onSearch={onSearch}
								onChange={onChange}
								placeholder="Search place name"
							/>
							<Button
								style={{ width: 80 }}
								type="primary"
								onClick={findLocation}
							>
								Search
							</Button>
						</Input.Group>
					</Content>
					<Content>
						<ScrollableBox style={{ height: "400px" }}>
							<Layout>
								<Content>
									<Table
										columns={columnsSearch}
										expandable={{
											expandedRowRender:
												expandedSearchRowRender,
											defaultExpandedRowKeys: ["0"],
										}}
										dataSource={dataSearch}
										pagination={false}
									/>
									<Table
										columns={columns}
										expandable={{
											expandedRowRender,
										}}
										dataSource={data}
										pagination={false}
									/>
								</Content>
								<Footer
									style={{
										textAlign: "center",
									}}
								>
									<Button
										type="primary"
										onClick={handleReset}
									>
										Reset Travel Plan
									</Button>
									<Button type="primary" onClick={() => {}}>
										Save This Travel Plan!
									</Button>
								</Footer>
							</Layout>
						</ScrollableBox>
					</Content>
				</Layout>
			</Layout>
		</div>
	);
}
