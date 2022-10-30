import { memo } from "react";
import CategoryItem, { CategoryItemSkeleton } from "../../atom/category";
import Category from "@/interfaces/category";
import ScrollTouch from "react-indiana-drag-scroll";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  categories: Category[];
}

const CategoriesGrid: React.FC<Props> = ({ categories }) => {
  return (
    <ScrollTouch vertical={false} hideScrollbars={false}>
      <div className="flex flex-1 snap-x p-3 gap-3">
        {categories.map(category => (
          <CategoryItem key={category.id} category={category} />
        ))}

        {categories.length === 0 && (
          <>
            <CategoryItemSkeleton />
            <CategoryItemSkeleton />
            <CategoryItemSkeleton />
            <CategoryItemSkeleton />
            <CategoryItemSkeleton />
            <CategoryItemSkeleton />
            <CategoryItemSkeleton />
            <CategoryItemSkeleton />
            <CategoryItemSkeleton />
          </>
        )}
      </div>
    </ScrollTouch>
  );
};

export default memo(CategoriesGrid);
