import Select from "./Select/Select";

interface DropDownListProps {
  onFilterChange: (filterState: string) => void;
}

const DropDownList: React.FC<DropDownListProps> = ({ onFilterChange }) => {
  return (
    <Select
      defaultValue="All"
      data={["All", "Complete", "Incomplete"]}
      onSelectionChange={onFilterChange}
    />
  );
};

export default DropDownList;
