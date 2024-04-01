import { icons } from "../assets/icons";

function Icon({
	name,
	width,
	height,
}: {
	name: keyof typeof icons;
	width: number;
	height: number;
}) {
	return (
		<img
			src={icons[name]}
			width={width}
			height={height}
			alt={`${name} icon`}
		/>
	);
}

export default Icon;
