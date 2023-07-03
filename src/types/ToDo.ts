export type ToDo = {
    id: number,
    title: string,
    category: string,
    sub_category: string,
    description: string,
    level: string,
    status: string,
    start_date : string,
    end_date : string,
    date_pattern : string,
    repeat : boolean,
    follwer : string[],
    location : string,
    feedback : string
}