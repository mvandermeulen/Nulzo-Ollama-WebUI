import {OllamaSettings} from "@/types/ollama";
import {isValid} from "@/services/utility.ts";
import {Fetch} from "@/types/fetch";

export class FetchWrapper {
    private _params: OllamaSettings;
    protected defaultHeaders: Headers;

    constructor(params: OllamaSettings) {
        this._params = params;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }

    process (fetch: Fetch, endpoint: string, opts: RequestInit = {}): Promise<Response> {
        opts.headers = {
            ...this.defaultHeaders,
            ...opts.headers,
        };
        return fetch(endpoint, opts);
    }

    async post (fetch: Fetch, endpoint: string, data?: Record<string, unknown> | BodyInit, options?: { signal: AbortSignal } | undefined): Promise<Response> {
        const url: string = `${this._params.host}:${this._params.port}/${this._params.endpoint}/${endpoint}`;
        const isRecord = (input: Record<string, unknown> | BodyInit | undefined): input is Record<string, unknown> | BodyInit | undefined => {
            return input !== null && typeof input === 'object' && !Array.isArray(input)
        };
        const cleanData: BodyInit | undefined = isRecord(data) ? JSON.stringify(data) : data
        const response: Response =  await this.process(fetch, url, {
            method: 'POST',
            body: cleanData,
            signal: options?.signal,
        });
        await isValid(response);
        return response;
    }

    async get (fetch: Fetch, endpoint: string): Promise<Response> {
        const url: string = `${this._params.host}:${this._params.port}/${this._params.endpoint}/${endpoint}`;
        return await this.process(fetch, url, {method: 'GET'});
    }
}