import Icon from "./Icon.tsx";

function Header() {
	return (
		<header
			className="
            flex flex-col items-center 
            my-8 gap-2
        "
		>
			<a
				href="/"
				className="flex justify-center items-center gap-2 text-4xl text-color1"
			>
				Todo
				<Icon name="logo" width={48} height={48} />
			</a>

			<h3 className="text-xl text-color4">Create a TodoList!</h3>
		</header>
	);
}

export default Header;
