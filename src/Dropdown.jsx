import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css'; // You can create this CSS file to style the dropdown

const Dropdown = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const dropdownRef = useRef(null);
  const optionsListRef = useRef(null);

  useEffect(() => {
    if (optionsListRef.current) {
      const optionElement = optionsListRef.current.children[highlightedIndex];
      if (optionElement) {
        const scrollContainer = optionsListRef.current;
        const elementTop = optionElement.offsetTop;
        const containerTop = scrollContainer.scrollTop;
        const containerBottom = containerTop + scrollContainer.clientHeight;

        if (elementTop < containerTop) {
          scrollContainer.scrollTop = elementTop;
        } else if (elementTop > containerBottom - optionElement.clientHeight) {
          scrollContainer.scrollTop = elementTop - scrollContainer.clientHeight + optionElement.clientHeight;
        }
      }
    }
  }, [highlightedIndex]);

//   Close the dropdown when clicked outside
  const handleWheel = (event) => {
    if (optionsListRef.current) {
      optionsListRef.current.scrollTop += event.deltaY;
      event.preventDefault();
    }
  };
  useEffect(() => {
    if (isOpen) {
      optionsListRef.current.addEventListener('wheel', handleWheel);

      const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };

      window.addEventListener('mousedown', handleOutsideClick);

      return () => {
        // optionsListRef.current.removeEventListener('wheel', handleWheel);
        window.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, [isOpen]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleDropdownOpen = () => {
    setIsOpen(true);
    setHighlightedIndex(0); // Set the first option as highlighted when the dropdown is opened
  };

  const handleHover = (option) => {
    var ind = options.indexOf(option);
    setHighlightedIndex(ind);
  }

  const handleKeyDown = (event) => {
    const { key } = event;

    if (key === 'ArrowUp' || key === 'ArrowDown') {
      event.preventDefault();

      const newIndex =
        key === 'ArrowUp'
          ? (highlightedIndex - 1 + options.length) % options.length
          : (highlightedIndex + 1) % options.length;

      setHighlightedIndex(newIndex);
    }

    if(key === 'Enter'){
        setSelectedOption(options[highlightedIndex]);
        setIsOpen(false);
    }
  };

  return (
    <div
      className="dropdown"
      tabIndex="0"
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
      onFocus={handleDropdownOpen} // Open dropdown on focus
    >
      <div className="select-bar" onClick={handleDropdownOpen}>
        <div>
            {selectedOption || 'Select an option'} 
        </div>
        <div className='imageContainer'>
            <img width="20" height="20" src="https://img.icons8.com/ios/50/expand-arrow--v1.png" alt="expand-arrow--v1"/>   
        </div>
      </div>
      {isOpen && (
        <div className="options-list" ref={optionsListRef}>
          {options.map((option, index) => (
            <div
              key={option}
              className={`option ${highlightedIndex === index ? 'highlighted' : ''}`}
              onMouseEnter={() => handleHover(option)}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;










