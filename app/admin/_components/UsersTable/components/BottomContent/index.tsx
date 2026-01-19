import { Pagination } from "@heroui/react";

export default function BottomContent({
  page,
  pages,
  setPage,
}: {
  page: number;
  pages: number;
  setPage: (page: number) => void;
}) {
  return (
    <div className="mx-auto flex items-center justify-between px-2 py-2">
      <Pagination
        className="cursor-pointer"
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={pages}
        onChange={setPage}
      />
    </div>
  );
}
