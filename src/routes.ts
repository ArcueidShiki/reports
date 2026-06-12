export const ROUTE_PATHS = {
  home: '/',
  products: '/products',
  market: '/market',
  alpha: '/alpha',
  signals: '/signals',
  wisdom: '/wisdom',
  gallery: '/gallery',
} as const;

export type RoutePath = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS];

export interface NavItem {
  readonly path: RoutePath;
  readonly labelKey: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { path: ROUTE_PATHS.home, labelKey: 'nav.home' },
  { path: ROUTE_PATHS.products, labelKey: 'nav.products' },
  { path: ROUTE_PATHS.market, labelKey: 'nav.market' },
  { path: ROUTE_PATHS.alpha, labelKey: 'nav.alpha' },
  { path: ROUTE_PATHS.signals, labelKey: 'nav.signals' },
  { path: ROUTE_PATHS.wisdom, labelKey: 'nav.wisdom' },
  { path: ROUTE_PATHS.gallery, labelKey: 'nav.gallery' },
];
