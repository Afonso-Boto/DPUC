import Select from "react-select";

const Selector = ({
    className = "",
    classNamePrefix = "",
    name = "",
    placeholder = "Selecione...",
    
    options = [],
    getOptionLabel = ((option)=>option.label),
    getOptionValue = ((option)=>option.value),
    isMulti = false,
    
    defaultValue = null,
    value = null,
    onChange = ((e)=>console.log(e)),

    isDisabled = false,
    isClearable= true,
    isSearchable= true,
    closeMenuOnSelect = true
}) => {

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: "#F8F4F4",
            border: state.isFocused && "2px solid black" || "1px solid black",
            fontWeight: "500",
            fontSize: "90%",
            minHeight: 42,
        }),
        option: (provided, state) => ({
            ...provided,
            fontWeight: state.isSelected && "500" || "400",
            color: state.isFocused && "white" || state.isSelected && "#black" || "black",
            backgroundColor: state.isFocused && "#0EB4BD" || state.isSelected && "#F8F4F4" || "white",
        }),
        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: data.color,
            ":hover": {
              backgroundColor: "#A4A2A2",
              color: "white",
            },
        }),
        dropdownIndicator: base => ({
            ...base,
            color: "black"
        }),
        clearIndicator: base => ({
            ...base,
            color: "black"
        }),
    }
    return ( 
        <Select
            className={className}
            classNamePrefix={classNamePrefix}
            name={name}
            placeholder={placeholder}

            options={options}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            isMulti={isMulti}

            defaultValue={defaultValue}
            value={value}
            onChange={onChange}

            isDisabled={isDisabled}
            isClearable={isClearable}
            isSearchable={isSearchable}

            closeMenuOnSelect={closeMenuOnSelect}
            styles={customStyles}
            theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                    ...theme.colors,
                    primary25: '#0EB4BD',
                    primary50: '#0EB4BD',
                    primary: '#F8F4F4',
                },
            })}
        />
     );
}
 
export default Selector;