import Icon from "./Icon.tsx";

function Item({
	value,
	onDelete,
	onTick,
	index,
	tick,
}: {
	value: string;
	onDelete: (index: number) => void;
	onTick: (index: number) => void;
	index: number;
	tick: boolean;
}) {
	return (
		<li
			className="
            flex flex-row justify-between items-center 
            min-w-80 h-12 
            bg-color1
            text-color4 px-4
        "
		>
			<p className="w-full overflow-hidden">{value}</p>

			<div className="flex item-center">
				<button
					onClick={() => onTick(index)}
					style={{
						backgroundColor: `${tick ? "green" : "transparent"}`,
					}}
					className="
						flex justify-center items-center
                        w-8 h-8 mx-4
                        border-2 border-solid border-color4
                "
				>
					<Icon name="tick" width={24} height={24} />
				</button>

				<button
					onClick={() => onDelete(index)}
					className="
						flex justify-center items-center
                        w-8 h-8 
                        bg-[#FF0000]
                "
				>
					<Icon name="delete" width={24} height={24} />
				</button>
			</div>
		</li>
	);
}

export default Item;
