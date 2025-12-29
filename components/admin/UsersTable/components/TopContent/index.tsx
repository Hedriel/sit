import { Button, Input } from "@heroui/react";
import { PlusIcon, Search } from "lucide-react";
import { User } from "../../data";

export default function TopContent({
  filterValue,
  onClear,
  onSearchChange,
  onRowsPerPageChange,
  users,
}: {
  filterValue: string;
  onClear: () => void;
  onSearchChange: (value: string) => void;
  onRowsPerPageChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  users: User[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<Search />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          <Button color="primary" endContent={<PlusIcon size={22} />}>
            Agregar Usuario
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {users.length} usuarios
        </span>
        <label className="flex items-center text-default-400 text-small">
          Filas por página:
          <select
            className="bg-transparent outline-solid outline-transparent text-default-400 text-small"
            onChange={onRowsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>
    </div>
  );
}
