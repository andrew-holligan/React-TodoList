import Icon from "./Icon";

function UserHeader({ username }: { username: string }) {
	return (
		<header
			className="
            flex items-center justify-center
			gap-4
        "
		>
			<h3 className="text-2xl text-color1">{username}</h3>

			<a
				href="/logout"
				className="
						flex justify-center items-center
                        w-8 h-8 
                        bg-[#FF0000]
                "
			>
				<Icon name="logout" width={24} height={24} />
			</a>
		</header>
	);
}

export default UserHeader;
