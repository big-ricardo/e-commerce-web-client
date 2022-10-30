import { Tag } from "antd";
import React, { memo } from "react";

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  tag: string;
  index: number;
}

const colors = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
];

const TagsComponent: React.FC<TagProps> = ({ tag, index }) => {
  return (
    <Tag key={tag} color={colors[index % colors.length]} className="mr-2">
      {tag}
    </Tag>
  );
};

export default memo(TagsComponent);
