import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SelectViewport } from "@radix-ui/react-select";

interface PsychologistFilterProps {
  onFilterChange: (value: string) => void;
}

export const PsychologistFilter = ({
  onFilterChange,
}: PsychologistFilterProps) => {
  return (
    <Select onValueChange={onFilterChange}>
      <SelectTrigger className="w-full sm:w-[236px]">
        <SelectValue placeholder="Select option" />
      </SelectTrigger>
      <SelectContent>
        <SelectViewport className="p-2">
          <SelectItem value="atoz">A to Z</SelectItem>
          <SelectItem value="ztoa">Z to A</SelectItem>
          <SelectItem value="less10">Less than 10$</SelectItem>
          <SelectItem value="great10">Greater than 10$</SelectItem>
          <SelectItem value="pop">Popular</SelectItem>
          <SelectItem value="notpop">Not popular</SelectItem>
          <SelectItem value="all">Show all</SelectItem>
        </SelectViewport>
      </SelectContent>
    </Select>
  );
};
