import { NavLink } from "react-router-dom";
import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from "@mui/material";
import { useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";

import classes from "./MainNavigation.module.css";

/**
 * Nav bar
 */
function MainNavigation() {
	const [openMenu, setOpenMenu] = useState(false);
	const menuOptions = [
		{
			text: "Home",
			to: "/",
		},
		{
			text: "Calendario de eventos",
			to: "/calendario",
		},
		{
			text: "Blog",
			to: "/blog",
		},
		{
			text: "Iniciar sesión",
			to: "/login",
		},
	];
	return (
		<header className={classes.header}>
			<NavLink to={"/"}>
                <p>LOGO PLACEHOLDER</p>
			    {/*<img className={classes.logo} src={logo}></img>*/}
			</NavLink>
			{/*This section is hidden in small screens*/}
			<nav className={classes.navBar}>
				<ul className={classes.list}>
					{menuOptions.map((item) => (
						<li key={item.text}>
							<NavLink
								to={item.to}
								className={({ isActive }) =>
									isActive ? classes.active : undefined
								}
								end
							>
								{item.text}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
			{/*This section is hidden in big screens*/}
			<HiOutlineBars3
				size={70}
				className={classes.navDropdown}
				onClick={() => setOpenMenu(true)}
			/>
			<Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
				<Box
					className={classes.drawer}
					sx={{ width: 250 }}
					role="presentation"
					onClick={() => setOpenMenu(false)}
					onKeyDown={() => setOpenMenu(false)}
				>
					<List>
						{menuOptions.map((item) => (
							<ListItem key={item.text} disablePadding>
								<ListItemButton component={NavLink} to={item.to}>
									<ListItemText primary={item.text} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</Box>
			</Drawer>
		</header>
	);
}

export default MainNavigation;