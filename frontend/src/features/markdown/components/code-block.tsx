import React from "react";
import { useClipboard } from "@/hooks/use-clipboard";
import CodeCopyButton from "./copy-button";
import hljs from "highlight.js";

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const { copy, copied } = useClipboard();

  const { value: highlightedCode, language } = hljs.highlightAuto(code);

  const handleCopy = () => {
    copy(code);
  };

  return (
    <div className="text-sm relative rounded-lg overflow-hidden my-6 mx-4">
      <div className="flex justify-between items-center bg-secondary p-2">
        <span className="pl-2 text-xs text-muted-foreground">
            {language || 'plaintext'}
        </span>
        <CodeCopyButton onClick={handleCopy} copied={copied} />
      </div>
      <pre className="pb-4 px-4 py-3 bg-secondary rounded-t-none">
        <code
          className="mt-0 mb-3"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  );
};

export default CodeBlock;
