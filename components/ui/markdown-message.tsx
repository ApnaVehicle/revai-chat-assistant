"use client"

import React, { memo, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { marked } from 'marked';

/**
 * Parse markdown content into discrete blocks for memoization
 * This prevents re-parsing unchanged blocks during streaming
 */
function parseMarkdownIntoBlocks(markdown: string): string[] {
  if (!markdown || markdown.trim() === '') {
    return [];
  }

  try {
    const tokens = marked.lexer(markdown);
    return tokens.map(token => token.raw);
  } catch (error) {
    // If parsing fails, return the whole content as a single block
    console.error('Markdown parsing error:', error);
    return [markdown];
  }
}

/**
 * Memoized markdown block component
 * Only re-renders when the content actually changes
 */
const MemoizedMarkdownBlock = memo(
  ({ content }: { content: string }) => (
    <ReactMarkdown
      remarkPlugins={[remarkGfm as any]}
      components={{
        // Headings
        h1: ({ children }) => (
          <h1 className="text-xl font-bold mb-3 mt-4 text-[#1A1D2E] first:mt-0">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-lg font-semibold mb-2.5 mt-3 text-[#1A1D2E]">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-base font-semibold mb-2 mt-2.5 text-[#1A1D2E]">
            {children}
          </h3>
        ),

        // Paragraphs
        p: ({ children }) => (
          <p className="mb-3 leading-relaxed text-[#1A1D2E] last:mb-0">
            {children}
          </p>
        ),

        // Lists
        ul: ({ children }) => (
          <ul className="list-disc ml-5 mb-3 space-y-1.5 text-[#1A1D2E]">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal ml-5 mb-3 space-y-1.5 text-[#1A1D2E]">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="leading-relaxed pl-1">
            {children}
          </li>
        ),

        // Code blocks and inline code
        code: ({ inline, className, children, ...props }: any) => {
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : '';

          return !inline && language ? (
            <div className="my-3 rounded-lg overflow-hidden">
              <SyntaxHighlighter
                style={oneDark}
                language={language}
                PreTag="div"
                customStyle={{
                  margin: 0,
                  padding: '1rem',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  borderRadius: '0.5rem',
                }}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code
              className="bg-gray-100 text-[#1A1D2E] px-1.5 py-0.5 rounded text-sm font-mono"
              {...props}
            >
              {children}
            </code>
          );
        },

        // Emphasis
        strong: ({ children }) => (
          <strong className="font-semibold text-[#1A1D2E]">
            {children}
          </strong>
        ),
        em: ({ children }) => (
          <em className="italic text-[#1A1D2E]">
            {children}
          </em>
        ),

        // Blockquotes
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-blue-500 pl-4 py-1 my-3 italic text-gray-700">
            {children}
          </blockquote>
        ),

        // Links
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            {children}
          </a>
        ),

        // Horizontal rules
        hr: () => (
          <hr className="my-4 border-t border-gray-200" />
        ),

        // Tables
        table: ({ children }) => (
          <div className="overflow-x-auto my-3">
            <table className="min-w-full border-collapse border border-gray-300">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-gray-50">
            {children}
          </thead>
        ),
        tbody: ({ children }) => (
          <tbody>
            {children}
          </tbody>
        ),
        tr: ({ children }) => (
          <tr className="border-b border-gray-200">
            {children}
          </tr>
        ),
        th: ({ children }) => (
          <th className="px-4 py-2 text-left font-semibold text-[#1A1D2E] border border-gray-300">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-2 text-[#1A1D2E] border border-gray-300">
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  ),
  (prevProps, nextProps) => prevProps.content === nextProps.content
);

MemoizedMarkdownBlock.displayName = 'MemoizedMarkdownBlock';

/**
 * Main MarkdownMessage component with block-level memoization
 * Optimized for streaming AI responses
 */
export const MarkdownMessage = memo(
  ({ content }: { content: string }) => {
    const blocks = useMemo(
      () => parseMarkdownIntoBlocks(content),
      [content]
    );

    return (
      <div className="markdown-content">
        {blocks.map((block, index) => (
          <MemoizedMarkdownBlock
            key={`${content.length}-${index}`}
            content={block}
          />
        ))}
      </div>
    );
  }
);

MarkdownMessage.displayName = 'MarkdownMessage';
