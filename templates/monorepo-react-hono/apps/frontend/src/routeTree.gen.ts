/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SignInImport } from './routes/sign-in'
import { Route as AuthedImport } from './routes/_authed'
import { Route as AuthedIndexImport } from './routes/_authed/index'

// Create/Update Routes

const SignInRoute = SignInImport.update({
  id: '/sign-in',
  path: '/sign-in',
  getParentRoute: () => rootRoute,
} as any)

const AuthedRoute = AuthedImport.update({
  id: '/_authed',
  getParentRoute: () => rootRoute,
} as any)

const AuthedIndexRoute = AuthedIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthedRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authed': {
      id: '/_authed'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthedImport
      parentRoute: typeof rootRoute
    }
    '/sign-in': {
      id: '/sign-in'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof SignInImport
      parentRoute: typeof rootRoute
    }
    '/_authed/': {
      id: '/_authed/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthedIndexImport
      parentRoute: typeof AuthedImport
    }
  }
}

// Create and export the route tree

interface AuthedRouteChildren {
  AuthedIndexRoute: typeof AuthedIndexRoute
}

const AuthedRouteChildren: AuthedRouteChildren = {
  AuthedIndexRoute: AuthedIndexRoute,
}

const AuthedRouteWithChildren =
  AuthedRoute._addFileChildren(AuthedRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof AuthedRouteWithChildren
  '/sign-in': typeof SignInRoute
  '/': typeof AuthedIndexRoute
}

export interface FileRoutesByTo {
  '/sign-in': typeof SignInRoute
  '/': typeof AuthedIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_authed': typeof AuthedRouteWithChildren
  '/sign-in': typeof SignInRoute
  '/_authed/': typeof AuthedIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '' | '/sign-in' | '/'
  fileRoutesByTo: FileRoutesByTo
  to: '/sign-in' | '/'
  id: '__root__' | '/_authed' | '/sign-in' | '/_authed/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthedRoute: typeof AuthedRouteWithChildren
  SignInRoute: typeof SignInRoute
}

const rootRouteChildren: RootRouteChildren = {
  AuthedRoute: AuthedRouteWithChildren,
  SignInRoute: SignInRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_authed",
        "/sign-in"
      ]
    },
    "/_authed": {
      "filePath": "_authed.tsx",
      "children": [
        "/_authed/"
      ]
    },
    "/sign-in": {
      "filePath": "sign-in.tsx"
    },
    "/_authed/": {
      "filePath": "_authed/index.tsx",
      "parent": "/_authed"
    }
  }
}
ROUTE_MANIFEST_END */
