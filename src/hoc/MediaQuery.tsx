import { useMediaQuery } from 'react-responsive';

export const useIsMobile = () => {
    const isMobileSmall = useMediaQuery({ maxWidth: 991.98, minWidth: 767.98 });
    const isMobileLarge = useMediaQuery({ maxWidth: 1199.98, minWidth: 991.98 });
    const isMobileLarger = useMediaQuery({ maxWidth: 1399.98, minWidth: 1199.98 });
    const isMobileXXLarge = useMediaQuery({ minWidth: 1399.98 });

    return isMobileSmall || isMobileLarge || isMobileLarger || isMobileXXLarge;
}
