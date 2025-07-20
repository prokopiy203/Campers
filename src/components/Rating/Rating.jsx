import Icon from "../UI/Icon/Icon";

function Rating({
  value,
  max = 5,
  size = 16,
  fullIconName,
  emptyIconName,
  halfIconName,
  fill = "#FFC531",
}) {
  const fullStars = Math.floor(value);
  const hasHalfStar = value - fullStars >= 0.5;

  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[...Array(fullStars)].map((_, i) => (
        <Icon
          key={"full" + i}
          name={fullIconName}
          size={size}
          fill={fill}
          stroke={"transparent"}
        />
      ))}
      {hasHalfStar && halfIconName && (
        <Icon
          key="half"
          name={halfIconName}
          size={size}
          fill={fill}
          stroke={"transparent"}
        />
      )}
      {[...Array(max - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <Icon
          key={"empty" + i}
          name={emptyIconName}
          size={size}
          fill="#f2f4f7"
          stroke={"transparent"}
        />
      ))}
    </div>
  );
}

export default Rating;
