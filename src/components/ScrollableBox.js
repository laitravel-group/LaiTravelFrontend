import React from "react";
import { Scrollbars } from "rc-scrollbars";

export default function ScrollableBox({ children }) {
	return (
		<Scrollbars style={{ height: "450px" }} autoHide>
			{children}
		</Scrollbars>
	);
}
