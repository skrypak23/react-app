export type ID = number;
export type RecordAction = {
    onEdit: (id: ID) => void;
    onDelete: (id: ID) => void;
};