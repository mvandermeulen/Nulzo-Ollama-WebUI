import {useEffect, useState} from 'react';
import {settingsService} from "@/services/storage/client.ts";

const useChatInitialization = () => {
    const [model, setModel] = useState<string>('');
    const [uuid, setUuid] = useState('');

    useEffect(() => {
        const fetchModel = async () => {
            const settings = await settingsService.fetchSettings();
            const default_model = settings.default_model;
            setModel(default_model ?? '');
        };
        fetchModel();
    }, []);

    return { model, uuid };
};

export { useChatInitialization };