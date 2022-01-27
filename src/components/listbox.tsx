import React, {
  createRef,
  RefObject,
  useEffect,
  useRef,
  useState
} from "react";
import classnames from "classnames";
import "../styles.css";

type ListBoxProps = {
  dropDownOptions: string[] | number[];
  dropDownRef?: React.Ref<HTMLSelectElement>;
  dropDownText: string;
  selectedOptionIndex?: number;
};

export const Listbox: React.FC<ListBoxProps> = ({
  dropDownRef,
  dropDownText,
  dropDownOptions,
  selectedOptionIndex = 0
}) => {
  // refs
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const optionRef = useRef([]) as React.MutableRefObject<
    Array<RefObject<HTMLLIElement>>
  >;
  // state
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedValueIndex, setSelectedValueIndex] = useState(
    selectedOptionIndex
  );
  // const [focusedValueIndex] = useState(selectedOptionIndex);

  useEffect(() => {
    // Set focus to the currently selected option whenever the dropdown expands
    if (isDropdownOpen) {
      optionRef.current[selectedOptionIndex].current?.focus();
    }
  }, [isDropdownOpen, selectedOptionIndex]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
    buttonRef.current?.focus();
  };

  optionRef.current = dropDownOptions.map(() => createRef());
  const onChange = (requestedIndex: number) => {
    setSelectedValueIndex(requestedIndex);
  };

  const onSelected = (
    evt: React.MouseEvent | React.KeyboardEvent,
    option: number
  ) => {
    evt.preventDefault();
    onChange(option);
    toggleDropdown();
  };

  return (
    <section style={{}} ref={listboxRef}>
      <span className="pr0 f6 mid-gray">{dropDownText}</span>
      <button
        className="bw0 bg-white pointer underline f6"
        onClick={toggleDropdown}
        ref={buttonRef}
      >
        {dropDownOptions[selectedValueIndex]}
      </button>
      <ul
        className={classnames("f6 bg-white br2 list pa2 pl4 ml2 shadow-3", {
          dn: !isDropdownOpen
        })}
      >
        {dropDownOptions.map((option, index: number) => {
          const ref = optionRef.current[index];
          return (
            <li
              className="bg-white black bw0 lh-solid mb1 sans-serif tl"
              key={index}
              onClick={(evt) => onSelected(evt, index)}
              ref={ref}
              style={{
                cursor: "pointer"
              }}
            >
              {option}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Listbox;
