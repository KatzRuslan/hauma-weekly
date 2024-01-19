export const adapter = {
    addOne: <T>(state: any, key: string, item: any) => {
        if (!state[key]) {
            return { state };
        }
        let updated: any;
        const data = state[key];
        if (Array.isArray(data)) {
            if (!(data && item)) {
                return { ...state }
            }
            updated = [...data, item];
        }
        return {
            ...state,
            [key]: updated
        }
    },
    updateOne: <T>(state: any, key: string, update: { id?: string; changes: any }) => {
        if (!(key in state)) {
            return { state };
        }
        let updated: any;
        const data = state[key];
        if (Array.isArray(data)) {
            if (!(data && update?.id && update?.changes)) {
                return { ...state }
            }
            updated = data.map((item) => ({ ...item, ...(item.id === update.id ? update.changes : {}) }));
        } else if (typeof data === 'object') {
            if (!(`${update?.id}` in data)) {
                return { ...state }
            }
            updated = {
                ...data,
                [`${update?.id}`]: update.changes
            };
        } else {
            updated = update.changes;
        }
        return {
            ...state,
            [key]: updated
        }
    },
    removeOne: <T>(state: any, key: string, id?: string) => {
        if (!state[key]) {
            return { state };
        }
        let updated: any;
        const data = state[key];
        if (Array.isArray(data)) {
            if (!(data && id)) {
                return { ...state }
            }
            updated = data.filter((item) => item.id !== id);
        }
        return {
            ...state,
            [key]: updated
        }
    },
};