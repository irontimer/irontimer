import { For, JSX, Show } from "solid-js";
import "./notification-center.scss";

/* <a href="/">Index</a>
	 <a href="/about">About</a>
	 <Suspense>{props.children}</Suspense> */

export default function NotificationCenter(): JSX.Element {
	return (
		<div id="notification-center">
			<Show when={false}>
				<For each={[]}>
					{(notification) => {
						return (
							<div class="notification" onClick={() => "delete notification"}>
								{"notification message"}
							</div>
						);
					}}
				</For>
			</Show>
		</div>
	);
}
