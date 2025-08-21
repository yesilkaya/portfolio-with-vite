export declare const messages: {
    common: {
        not_found: string;
        server_error: string;
        action_success: string;
        action_error: string;
    };
    db: {
        created: (dbName: string) => string;
        tables_created: string;
        error: string;
    };
    get: {
        contacts_error: string;
    };
    post: {
        create_success: string;
        create_error: string;
    };
    put: {
        update_success: string;
        update_conflict: string;
        update_error: string;
    };
    delete: {
        delete_success: string;
        delete_error: string;
    };
    http: {
        endpoint_not_found: string;
        method_not_found: string;
        not_found: string;
    };
    contact: {
        first_name_required: string;
        last_name_required: string;
        email_required: string;
        email_invalid: string;
        message_required: string;
        send_success: (msg: string) => string;
        send_error: (err: string) => string;
    };
    feedback: {
        title: string;
        delete_success: string;
        delete_error: string;
        update_success: string;
        update_error: (err: string) => string;
        no_messages: string;
        placeholder_first_name: string;
        placeholder_last_name: string;
        placeholder_email: string;
        send_button: string;
        new_message_button: string;
    };
};
