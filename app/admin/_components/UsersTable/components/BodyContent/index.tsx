import {
  Chip,
  TableCell,
  TableRow,
  Tooltip,
  User as UserCard,
} from "@heroui/react";
import { PenLine, Trash2 } from "lucide-react";
import { statusColorMap, User } from "../../data";
import defaultProfile from "@/public/images/default-user.webp";

export function renderBodyContent(
  item: User,
  handleDeleteUser: (userId: string) => void
) {
  return (
    <TableRow key={item.id}>
      <TableCell className="min-w-16">
        <>
          <UserCard
            className="hidden sm:inline-flex"
            avatarProps={{
              radius: "lg",
              src: item.avatar_url || defaultProfile.src,
            }}
            name={item.fullname}
          />
          <div className="sm:hidden">
            <p className="text-sm">{item.fullname}</p>
          </div>
        </>
      </TableCell>
      <TableCell className="text-sm">{item.email}</TableCell>
      <TableCell>
        <Chip
          className="capitalize"
          color={statusColorMap[item.role]}
          size="sm"
          variant="flat"
        >
          {item.role}
        </Chip>
      </TableCell>
      <TableCell>
        <div className="relative flex justify-center gap-2">
          <Tooltip content="Edit user">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <PenLine size={18} />
            </span>
          </Tooltip>

          <Tooltip color="danger" content="Delete user">
            <span
              onClick={() => handleDeleteUser(item.id)}
              className="text-lg text-danger cursor-pointer active:opacity-50"
            >
              <Trash2 size={18} />
            </span>
          </Tooltip>
        </div>
      </TableCell>
    </TableRow>
  );
}
