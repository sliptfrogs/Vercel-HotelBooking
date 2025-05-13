import { animate, stagger } from "motion";
import { useEffect, useRef } from "react";

export default function AnimateOnceText({ 
  text = "Hello World!", 
  className = "",
  as: Tag = "div",
  staggerDelay = 0.05,
  animation = {
    opacity: [0, 1],
    y: [20, 0]
  }
}) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            
            const textElement = textRef.current;
            const originalText = textElement.textContent;
            textElement.innerHTML = "";

            // Split into words and spaces while preserving all whitespace
            const tokens = originalText.split(/(\s+)/);
            
            tokens.forEach(token => {
              if (token.trim() === "") {
                // It's whitespace - add directly as text node
                textElement.appendChild(document.createTextNode(token));
              } else {
                // It's a word - create animated spans
                const wordSpan = document.createElement("span");
                wordSpan.style.display = "inline-block";
                wordSpan.style.whiteSpace = "nowrap";
                
                token.split("").forEach(char => {
                  const charSpan = document.createElement("span");
                  charSpan.style.display = "inline-block";
                  charSpan.textContent = char === ' ' ? '\u00A0' : char;
                  wordSpan.appendChild(charSpan);
                });
                
                textElement.appendChild(wordSpan);
              }
            });

            // Animate all character spans (including non-breaking spaces)
            const spans = Array.from(textElement.querySelectorAll("span > span"));
            animate(
              spans,
              animation,
              {
                type: "spring",
                duration: 0.8,
                bounce: 0.2,
                delay: stagger(staggerDelay)
              }
            );
            
            observer.unobserve(containerRef.current);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [text]);

  return (
    <div ref={containerRef} className={`overflow-hidden`}>
      <Tag ref={textRef} className={`inline-block ${className}`}>
        {text}
      </Tag>
    </div>
  );
}