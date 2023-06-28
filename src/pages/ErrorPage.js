import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
	const err = useRouteError();
	console.error(err);

	return (
		<div id="error_page" style={{ textAlign: "center", marginTop: "50px" }}>
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred</p>
			<p>
				<i>
					{err.status} {err.statusText || err.message}
				</i>
			</p>
			<p>
				<Link to="/">back to home</Link>
			</p>
		</div>
	);
}
