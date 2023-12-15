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
import Logout from "../Logout/Logout";

/**
 * Nav bar
 */
interface MainNavigationProps {
	userRole: string | null;
}

function MainNavigation({ userRole }: MainNavigationProps) {
	const [openMenu, setOpenMenu] = useState(false);
	const [openLogout, setOpenLogout] = useState(false);
	const menuOptions = [
		{
			text: "Home",
			to: "/",
		},
		{
			text: "Grupos",
			to: "/grupos",
		},
		{
			text: "Calendario de eventos",
			to: "/eventos",
		},
		{
			text: "Blog",
			to: "/blog",
		},
		{
			text: "Documentos",
			to: "/documentos",
		},
		{
			text: "Iniciar sesión",
			to: "/login",
		},
	];
	const showLogout = () => {
		setOpenLogout(true);
	};
	const hideLogout = () => {
		setOpenLogout(false);
	};
	return (
		<>
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
						{userRole ? <li onClick={showLogout}>Cerrar sesión</li> : null}
					</ul>
				</nav>
				{/*This section is hidden in big screens*/}
				<HiOutlineBars3
					color={"var(--color-main-blue)"}
					size={70}
					className={classes.navDropdown}
					onClick={() => setOpenMenu(true)}
				/>
				<Drawer
					open={openMenu}
					onClose={() => setOpenMenu(false)}
					anchor="right"
				>
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
							{userRole ? (
								<ListItem disablePadding>
									<ListItemButton onClick={showLogout}>
										<ListItemText primary={"Cerrar sesión"} />
									</ListItemButton>
								</ListItem>
							) : null}
						</List>
					</Box>
				</Drawer>
			</header>
			{userRole ? (
				<>
					<Logout show={openLogout} handleCancel={hideLogout}></Logout>
				</>
			) : null}
		</>
	);
}

export default MainNavigation;
