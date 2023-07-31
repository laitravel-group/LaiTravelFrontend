import React, { useState } from "react";
import { Button, Layout, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import GoogleMap from "google-maps-react-markers";
import PageHeader from "../PageHeader";
import { apiKey } from "../../key";
import SearchBox from "./SearchBox";
import ScrollableBox from "../ScrollableBox";
import TestPage from "../../pages/TestPage";

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

export default function NewPlanBuild(props) {
	const { confirm } = Modal;

	// google map
	const { googleMap } = props;
	const { mapInstance, mapApi, mapApiLoaded } = googleMap;
	const { setMapInstance, setMapApi, setMapApiLoaded } = googleMap;

	// states
	const [mapCenter, setMapCenter] = useState({
		lat: props.cityLocation.lat,
		lng: props.cityLocation.lng,
	});
	const [placesSearchResult, setPlacesSearchResult] = useState([]);

	// google place service
	const placesService = new mapApi.places.PlacesService(mapInstance);

	const handleCenterChange = () => {
		if (mapApiLoaded) {
			setMapCenter({
				lat: mapInstance.center.lat(),
				lng: mapInstance.center.lng(),
			});
		}
	};

	return (
		<Layout
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100vh",
			}}
			hasSider
		>
			<Sider width={"calc(100% - 928px)"} theme="light">
				<GoogleMap
					apiKey={apiKey}
					onChange={handleCenterChange}
					defaultCenter={props.cityLocation}
					defaultZoom={11}
					yesIWantToUseGoogleMapApiInternals
					onGoogleApiLoaded={({ map, maps }) => {
						setMapInstance(map);
						setMapApi(maps);
						setMapApiLoaded(true);
					}}
				></GoogleMap>
			</Sider>
			<Layout style={{ marginLeft: "15px", marginRight: "100px" }}>
				<PageHeader />
				<Content>
					<SearchBox
						googleMap={googleMap}
						placesService={placesService}
						setSearchResult={setPlacesSearchResult}
					/>
				</Content>
				<Content>Recommendation</Content>
				<Content>
					Scrollbars
					<ScrollableBox>
						<p style={{ minHeight: "1000px" }}>abc</p>
					</ScrollableBox>
				</Content>
				<Content>
					Plan Edit
					<TestPage />
				</Content>
				<Footer
					style={{
						textAlign: "center",
					}}
				>
					<Button
						type="primary"
						onClick={() => {}}
						style={{ marginRight: "10px" }}
					>
						Generate Travel Plan
					</Button>
					<Button
						onClick={() =>
							confirm({
								icon: <ExclamationCircleFilled />,
								title: "Are you sure to reset your travel plan?",
								content: "You will lose all your plan data!",
								onOk() {
									props.setSubPage("search");
								},
							})
						}
					>
						Reset Travel Plan
					</Button>
				</Footer>
			</Layout>
		</Layout>
	);

	/*
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
	);*/
}
