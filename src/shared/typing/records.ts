export type ID = number | string;
export type RecordAction = {
    onEdit: (id: ID) => void;
    onDelete: (id: ID) => void;
};