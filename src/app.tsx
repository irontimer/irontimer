import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { JSX, Suspense } from "solid-js";
import "./app.scss";
import NotificationCenter from "./components/notification-center";
import Top from "./components/top";

export default function App(): JSX.Element {
	return (
		<Router
			root={(props) => (
				<>
					<NotificationCenter />
					<Top />
					<Suspense>{props.children}</Suspense>
				</>
			)}
		>
			<FileRoutes />
		</Router>
	);
}
