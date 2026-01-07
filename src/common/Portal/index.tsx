import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FC,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  anchorEl: HTMLElement | null;
  children: ReactNode;
  offset?: number;
};

export const Portal: FC<PortalProps> = ({ anchorEl, children, offset = 0 }) => {
  // Hooks
  const portalRef = useRef<HTMLDivElement | null>(null);

  // State
  const [style, setStyle] = useState<CSSProperties>({
    position: "absolute",
    top: 0,
    left: 0,
  });
  const [isVisible, setIsVisible] = useState(false);

  if (!portalRef.current) {
    portalRef.current = document.createElement("div");
  }

  useEffect(() => {
    const el = portalRef.current!;
    if (!document.body.contains(el)) {
      document.body.appendChild(el);
    }

    return () => {
      if (el.parentNode === document.body) {
        document.body.removeChild(el);
      }
    };
  }, []);

  useEffect(() => {
    if (!anchorEl) return;

    const updatePosition = () => {
      if (!anchorEl || !portalRef.current) return;

      const rect = anchorEl.getBoundingClientRect();

      const box = portalRef.current.getBoundingClientRect();

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top = rect.bottom + offset;
      let left = rect.left;

      if (top + box.height > viewportHeight) {
        top = rect.top - box.height - offset;
      }

      if (left + box.width > viewportWidth) {
        left = viewportWidth - box.width - offset;
      }

      if (left < 0) {
        left = offset;
      }

      if (top < 0) {
        top = rect.bottom + offset;
      }

      setStyle({
        position: "absolute",
        top: `${top + window.scrollY}px`,
        left: `${left + window.scrollX}px`,
        zIndex: 9999,
      });
    };

    updatePosition();

    const handleScroll = () => {
      updatePosition();
    };

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [anchorEl, offset]);

  useEffect(() => {
    if (anchorEl) {
      setIsVisible(true);
    } else if (portalRef.current) {
      setIsVisible(false);
    }
  }, [anchorEl]);

  const animatedStyle: CSSProperties = {
    ...style,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "scale(1)" : "scale(0.95)",
    transition: "opacity 0.2s ease, transform 0.2s ease",
  };

  if (!anchorEl && !isVisible) return null;

  return createPortal(
    <div ref={portalRef} style={animatedStyle}>
      {children}
    </div>,
    document.body
  );
};
