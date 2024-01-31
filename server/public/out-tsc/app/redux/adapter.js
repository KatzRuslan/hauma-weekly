export const adapter = {
    addOne: (state, key, item) => {
        if (!state[key]) {
            return { state };
        }
        let updated;
        const data = state[key];
        if (Array.isArray(data)) {
            if (!(data && item)) {
                return { ...state };
            }
            updated = [...data, item];
        }
        return {
            ...state,
            [key]: updated
        };
    },
    addMany: (state, key, items) => {
        if (!state[key]) {
            return { state };
        }
        let updated;
        const data = state[key];
        if (Array.isArray(data)) {
            if (!(data && items && items.length)) {
                return { ...state };
            }
            updated = [...data, ...items];
        }
        return {
            ...state,
            [key]: updated
        };
    },
    updateOne: (state, key, update) => {
        if (!(key in state)) {
            return { state };
        }
        let updated;
        const data = state[key];
        if (Array.isArray(data)) {
            if (!(data && update?.id && update?.changes)) {
                return { ...state };
            }
            updated = data.map((item) => ({ ...item, ...(item.id === update.id ? update.changes : {}) }));
        }
        else if (typeof data === 'object') {
            if (!(`${update?.id}` in data)) {
                return { ...state };
            }
            updated = {
                ...data,
                [`${update?.id}`]: update.changes
            };
        }
        else {
            updated = update.changes;
        }
        return {
            ...state,
            [key]: updated
        };
    },
    removeOne: (state, key, id) => {
        if (!state[key]) {
            return { state };
        }
        let updated;
        const data = state[key];
        if (Array.isArray(data)) {
            if (!(data && id)) {
                return { ...state };
            }
            updated = data.filter((item) => item.id !== id);
        }
        return {
            ...state,
            [key]: updated
        };
    },
};
//# sourceMappingURL=adapter.js.map