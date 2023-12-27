/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from 'react';
import '../style/OptionsMenu.css';

function OptionsMenu({
  renameCallback,
  deleteCallback,
  closeMenuCallback,
  coordinates: { x, y },
}: {
  renameCallback: () => void;
  deleteCallback: () => void;
  closeMenuCallback: () => void;
  coordinates: { x: number; y: number };
}) {
  const thisRef = useRef<HTMLDivElement>(null);
  // This was taken straight from StackOverflow
  // Listen for a click event OUTSIDE this component (The little menu popup)
  // So on a click outside, call the function to close this, and unbind the document's event listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (thisRef.current && !thisRef.current.contains(event.target as Node)) {
        closeMenuCallback();
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [thisRef, closeMenuCallback]);

  return (
    <div
      className="menu box options-menu"
      style={{
        top: y,
        left: x,
      }}
      ref={thisRef}
    >
      <ul className="menu-list">
        <li>
          <a
            onClick={async () => {
              await renameCallback();
              closeMenuCallback();
            }}
          >
            Rename
          </a>
        </li>
        <li>
          <a
            onClick={async () => {
              await deleteCallback();
              closeMenuCallback();
            }}
          >
            Delete
          </a>
        </li>
      </ul>
    </div>
  );
}

export default OptionsMenu;
