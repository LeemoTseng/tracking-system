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

export interface statusInterface {
  number?: number
  MAWB_No: string
  HAWB_No: string
  processes: Array<{
    status: string;
    dateAndTime: string;
    img?: Array<{
      id?: number;
      imgName?: string;
      imgUrl?: string;
    }>;
  }>;
}
