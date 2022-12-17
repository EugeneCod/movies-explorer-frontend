import classNames from 'classnames';

function FilterCheckbox({ className, description, filterIsActive, onToggleFilter }) {

  function handleSwitch() {
    onToggleFilter(!filterIsActive);
  }

  return (
    <div className={`filter-checkbox ${className}`}>
      <button
        onClick={handleSwitch}
        type="button"
        className={classNames('filter-checkbox__switcher', {
          'filter-checkbox__switcher_active': filterIsActive,
        })}></button>
      <p className="filter-checkbox__description">{description}</p>
    </div>
  );
}

export default FilterCheckbox;
