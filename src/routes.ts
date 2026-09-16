import { ViewType } from './types';

export const ROUTE_FOR_VIEW: Record<Exclude<ViewType, 'clause-detail'>, string> = {
  home: '/',
  generator: '/generator',
  clauses: '/clauses',
  checklists: '/checklists',
  translator: '/translator',
  'local-hubs': '/local-hubs',
  architecture: '/architecture',
};

export function viewForPath(pathname: string): ViewType {
  if (pathname.startsWith('/clauses')) return 'clauses';
  if (pathname.startsWith('/generator')) return 'generator';
  if (pathname.startsWith('/checklists')) return 'checklists';
  if (pathname.startsWith('/translator')) return 'translator';
  if (pathname.startsWith('/local-hubs')) return 'local-hubs';
  if (pathname.startsWith('/architecture')) return 'architecture';
  return 'home';
}
