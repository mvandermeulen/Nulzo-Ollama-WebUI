export interface Conversation {
    uuid?: string,
    created_by?: string,
    is_pinned?: boolean,
    is_hidden?: boolean,
    timestamp?: string,
    updated_at?: string,
    name?: string;
    model?: string;
}