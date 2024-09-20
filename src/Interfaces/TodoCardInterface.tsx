export interface IToDoCard {
    items: IToDoItem[];
}

export interface IToDoCardProps {
    items: IToDoItem[];
}

export interface IToDoItem {
    id: number;
    title: string;
    isCompleted?: boolean;
}

export interface ITaskCardProps {
    item: IToDoItem;
}

export interface ITask {
    id: number;
    title: string;
    isCompleted: boolean;
}