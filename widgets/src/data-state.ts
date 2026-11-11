const selector = ':scope > script[type="application/json"][slot="data"]:not([src])';

export function readData(host: HTMLElement): { gates?: unknown; connections?: unknown } {
    const text = host.querySelector(selector)?.textContent;
    if (!text) return {};
    try {
        const value = JSON.parse(text);
        return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
    } catch {
        return {};
    }
}

export function writeData(host: HTMLElement, gates: string, connections: string) {
    const text = JSON.stringify({ gates: gates ? gates.split(',') : [], connections: connections ? connections.split(',') : [] }).replace(/</g, '\\u003c');
    const current = host.querySelector(selector);
    if (current?.textContent === text) return;
    const block = current ?? host.ownerDocument.createElement('script');
    if (!current) {
        block.setAttribute('type', 'application/json');
        block.setAttribute('slot', 'data');
    }
    block.textContent = text;
    if (!current) host.append(block);
}

export function restoreData(host: HTMLElement): { gates: string; connections: string } {
    const data = readData(host);
    return {
        gates: Array.isArray(data.gates) ? data.gates.filter((item): item is string => typeof item === 'string').join(',') : '',
        connections: Array.isArray(data.connections) ? data.connections.filter((item): item is string => typeof item === 'string').join(',') : '',
    };
}
