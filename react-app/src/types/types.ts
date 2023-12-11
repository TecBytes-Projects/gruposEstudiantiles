export interface event{
    id: bigint,
    title: string,
    date: string,
    time: string,
    place: string,
    description: string,
    groupName: string,
    authorizedToEdit: boolean,
}

export interface blogPost{
    id: bigint,
    title: string,
    date: string,
    text: string,
    image: string,
    authorizedToEdit: boolean,
}