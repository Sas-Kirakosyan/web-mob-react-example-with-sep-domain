const AutocompleteOptions = ({ suggestions, onSelect }) => {
  return (
    <ul
      style={{
        border: "1px solid #ccc",
        marginTop: "0",
        padding: "0",
        listStyleType: "none",
      }}
    >
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          onClick={() => onSelect(suggestion)}
          style={{ padding: "10px", cursor: "pointer" }}
        >
          {suggestion.description}
        </li>
      ))}
    </ul>
  );
};

export default AutocompleteOptions;
