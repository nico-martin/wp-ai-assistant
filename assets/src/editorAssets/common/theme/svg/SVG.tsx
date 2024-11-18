import cn from '../../classnames';
import { useMemo } from '@wordpress/element';

import icons, { IconName } from './icons';

const SVG = ({
  icon,
  className = '',
  ...props
}: {
  icon: IconName;
  className?: string;
  [key: string]: any;
}) => {
  const LoadedIcon = useMemo(
    () => (icon in icons ? icons[icon] : null),
    [icon]
  );

  return LoadedIcon ? (
    <span className={cn(className)} {...props}>
      <LoadedIcon />
    </span>
  ) : null;
};

export default SVG;
