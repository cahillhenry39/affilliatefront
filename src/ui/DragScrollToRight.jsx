import { useRef, useEffect } from "react";
import styled from "styled-components";

const ScrollContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow-x: auto;
  cursor: grab;
  user-select: none;
  scroll-behavior: auto; /* disable smooth during drag */
  will-change: scroll-position; /* performance hint */

  &::-webkit-scrollbar {
    height: 0;
  }

  &.dragging {
    cursor: grabbing;
  }
`;

export default function DragScrollX({ children, gap = "1rem", ...props }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;
    let velX = 0;
    let lastX = 0;
    let momentumID;

    const cancelMomentum = () => cancelAnimationFrame(momentumID);

    const momentumLoop = () => {
      el.scrollLeft -= velX;
      velX *= 0.95; // friction
      if (Math.abs(velX) > 0.5) {
        momentumID = requestAnimationFrame(momentumLoop);
      }
    };

    const startMomentum = () => {
      cancelMomentum();
      momentumID = requestAnimationFrame(momentumLoop);
    };

    const endDrag = () => {
      isDown = false;
      el.classList.remove("dragging");
      startMomentum();
    };

    // MOUSE
    const onMouseDown = (e) => {
      isDown = true;
      el.classList.add("dragging");
      startX = e.pageX - el.offsetLeft;
      lastX = e.pageX;
      scrollLeft = el.scrollLeft;
      cancelMomentum();
    };

    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = x - startX;
      el.scrollLeft = scrollLeft - walk;
      velX = e.pageX - lastX; // delta since last frame
      lastX = e.pageX;
    };

    const onMouseUp = endDrag;
    const onMouseLeave = endDrag;

    // TOUCH
    const onTouchStart = (e) => {
      isDown = true;
      startX = e.touches[0].pageX - el.offsetLeft;
      lastX = e.touches[0].pageX;
      scrollLeft = el.scrollLeft;
      cancelMomentum();
    };

    const onTouchMove = (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - el.offsetLeft;
      const walk = x - startX;
      el.scrollLeft = scrollLeft - walk;
      velX = e.touches[0].pageX - lastX;
      lastX = e.touches[0].pageX;
    };

    const onTouchEnd = endDrag;

    // Attach listeners
    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseup", onMouseUp);
    el.addEventListener("mouseleave", onMouseLeave);

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mouseleave", onMouseLeave);

      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);

      cancelMomentum();
    };
  }, []);

  return (
    <ScrollContainer ref={containerRef} style={{ gap }} {...props}>
      {children}
    </ScrollContainer>
  );
}
