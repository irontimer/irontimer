import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { JSX, Suspense } from "solid-js";
import "./app.scss";

export default function App(): JSX.Element {
	return (
		<Router
			root={(props) => (
				<>
					<a href="/">Index</a>
					<a href="/about">About</a>
					<Suspense>{props.children}</Suspense>
				</>
			)}
		>
			<FileRoutes />
		</Router>
	);
}
