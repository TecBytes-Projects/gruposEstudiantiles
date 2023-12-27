export interface event {
	id: number;
	title: string;
	date: string;
	time: string;
	place: string;
	description: string;
	groupName: string;
	isAuthorizedToEdit: boolean;
}

export interface blogPost {
	id: number;
	title: string;
	date: string;
	text: string;
	image: string;
	isAuthorizedToEdit: boolean;
}

export interface user {
	id: number;
	nombre: string;
	correo: string;
	rol: string;
	token: string;
}

export interface group {
	id: number;
	name: string;
	category: string;
}

export interface groupDetails {
	id: number;
	name: string;
	namePresi: string;
	nameVice: string;
	nameAsesor: string;
	mision: string;
	vision: string;
	description: string;
	category: string;
	level: string;
	logo: string;
	isAuthorizedToEdit: boolean;
}
