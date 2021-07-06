import React, { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { PartialRouteObject } from 'react-router';
import Index from '@/views/index';
import About from '@/views/about';

const routeList: PartialRouteObject[] = [
  {
    path: '/',
    element: <Index />,
  },
  {
    path: 'about',
    element: <About />,
  },
];
const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
