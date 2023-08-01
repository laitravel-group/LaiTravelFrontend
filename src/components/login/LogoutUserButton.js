import React, { useContext } from "react";
import { AuthContext } from "../../App";

export default function LogoutUserButton() {
	const auth = useContext(AuthContext);
	return <p onClick={auth.handleLogout}>placeholder</p>;
}
