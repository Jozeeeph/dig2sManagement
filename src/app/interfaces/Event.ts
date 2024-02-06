export interface Event {
    id: number;
    event_name: string;
    description: string;
    date: string;
    location: string;
    link: string;
    eventImage: {
        id: number;
        name: string;
        userImage: string; 
    };
}