import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './style.css';

export const BodySkeleton = ({
  rows = 5,
  columns = 5,
  enableSelection = false,
}: {
  rows?: number;
  columns?: number;
  enableSelection?: boolean;
}) => {
  const colCount = enableSelection ? columns + 1 : columns;

  return (
    <tbody className="body">
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <tr key={`skeleton-row-${rowIdx}`}>
          {Array.from({ length: colCount }).map((_, colIdx) => (
            <td key={`skeleton-col-${colIdx}`}>
              <Skeleton
                height={14}
                baseColor="var(--skeleton-base)"
                highlightColor="var(--skeleton-highlight)"
                borderRadius={4}
              />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
