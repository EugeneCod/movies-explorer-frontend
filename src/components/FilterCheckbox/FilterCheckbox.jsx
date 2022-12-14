import { useState } from 'react';
import classNames from 'classnames';

function FilterCheckbox({ className, description }) {
  const [isActive, setIsActive] = useState(true);

  function handleSwitch() {
    setIsActive(!isActive);
  }

  return (
    <div className={`filter-checkbox ${className}`}>
      <button
        onClick={handleSwitch}
        type="button"
        className={classNames('filter-checkbox__switcher', {
          'filter-checkbox__switcher_active': isActive,
        })}></button>
      <p className="filter-checkbox__description">{description}</p>
    </div>
  );
}

export default FilterCheckbox;
