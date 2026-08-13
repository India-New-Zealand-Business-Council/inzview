import React from 'react';

type HeadingTag = 'h1' | 'h2' | 'h3';

export type KineticHeadingProps = Readonly<{
  as?: HeadingTag;
  id?: string;
  className?: string;
  lines: readonly string[];
}>;

export default function KineticHeading({
  as: Tag = 'h2',
  id,
  className = '',
  lines,
}: KineticHeadingProps) {
  const label = lines.join(' ');
  let wordIndex = 0;

  return (
    <Tag
      id={id}
      className={`home-kinetic-heading ${className}`.trim()}
      aria-label={label}
      data-reel="words"
    >
      <span aria-hidden="true" className="home-kinetic-heading__visual">
        {lines.map((line, lineIndex) => {
          const words = line.split(/\s+/);

          return (
            <span key={`${line}-${lineIndex}`} className="home-kinetic-heading__line">
              {words.map((word, indexInLine) => {
                const index = wordIndex;
                wordIndex += 1;
                return (
                  <React.Fragment key={`${word}-${index}`}>
                    <span
                      className="home-kinetic-word"
                      style={{ '--word-index': index } as React.CSSProperties}
                    >
                      <span className="home-kinetic-word__inner">{word}</span>
                    </span>
                    {indexInLine < words.length - 1 ? ' ' : null}
                  </React.Fragment>
                );
              })}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}
