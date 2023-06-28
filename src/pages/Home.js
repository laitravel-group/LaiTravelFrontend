import React from "react";
import { Layout } from "antd";
import PageHeader from "../components/PageHeader";
import HomeContent from "../components/HomeContent";

export default function Home(props) {
	return (
		<Layout style={{ height: "100vh" }}>
			<PageHeader />
			<HomeContent />
		</Layout>
	);
}
