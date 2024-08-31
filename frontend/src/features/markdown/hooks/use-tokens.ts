import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import { useMemo } from "react";


const markedInstance = new Marked(
    markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang) {
            const result = lang
                ? hljs.highlight(code, { language: lang }).value
                : hljs.highlightAuto(code).value;
            return result;
        },
    })
);

export function useTokens(markdown: string) {
    return useMemo(() => {
        return markedInstance.lexer(markdown);
    }, [markdown]);
}