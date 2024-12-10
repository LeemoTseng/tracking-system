export interface milestonesInterface {
    order: number;
    milestone: string;
    dateandtime: string;
    files: boolean;
    imgUrl?: {
        id: number;
        name: string;
        url: string;
    }[]
}
