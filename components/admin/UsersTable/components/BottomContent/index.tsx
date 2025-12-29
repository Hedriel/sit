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
    <div className="py-2 px-2 flex justify-between items-center mx-auto">
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
