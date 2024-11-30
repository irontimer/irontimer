import { JSX } from "solid-js";
import "~/styles/main.scss";
import "./top.scss";

export default function Top(): JSX.Element {
	return (
		<div class="top">
			<div class="logo">
				<div class="icon unselectable">icon</div>
				<div class="title">
					<a class="lineless-link unselectable" href="/">
						<h1 class="unselectable">IronTimer</h1>
					</a>
				</div>
			</div>
		</div>
	);
}
