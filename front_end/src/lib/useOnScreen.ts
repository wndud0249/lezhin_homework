import { RefObject, useEffect, useState } from 'react';

export default function useOnScreen(ref: RefObject<HTMLDivElement>, rootMargin = '0px') {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer && ref && ref.current && observer.unobserve(ref.current);
    };
  }, [ref]);

  return isIntersecting;
}
