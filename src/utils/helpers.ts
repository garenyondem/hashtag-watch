function constructEventPayload(options?: { body?: string; event?: string }) {
    const data = [];
    if (options?.event) {
        data.push(`event: ${options.event}\n`);
    }
    data.push(`data: ${options?.body ?? ""}\n\n`);
    return data.join("");
}

function formatTag(tag: string) {
    return tag.startsWith("#") ? tag : `#${tag}`;
}

export { constructEventPayload, formatTag };
