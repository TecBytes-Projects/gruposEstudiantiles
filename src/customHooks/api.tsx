import { useEffect, useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";

/*
 * Custom hooks for communication with server through API
 */

export function useFetch<Type>(link: string, token: string | null) {
	const [data, setData] = useState<Type[]>([]);

	useEffect(() => {
		axios
			.get(link, {
				headers: {
					Authorization: "Bearer " + token,
				},
			})
			.then(function (response: AxiosResponse) {
				setData(response.data);
			})
			.catch(function (error: AxiosError) {
				console.log(error);
			});
	}, []);

	return data;
}

export function useFetchDetails<Type>(link: string, token: string | null) {
	const [data, setData] = useState<Type>();

	useEffect(() => {
		axios
			.get(link, {
				headers: {
					Authorization: "Bearer " + token,
				},
			})
			.then(function (response: AxiosResponse) {
				setData(response.data);
			})
			.catch(function (error: AxiosError) {
				console.log(error);
			});
	}, []);

	return data;
}
