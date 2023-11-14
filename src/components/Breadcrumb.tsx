import {RouteType} from "@/model/route.type";

type BreadcrumbProps = {
  previousRoutes: RouteType[],
  currentRoute: RouteType
};

// todo prettier
// todo ; after each line & spaces after brackets
export default function Breadcrumb({previousRoutes, currentRoute}: BreadcrumbProps) {
  const nav = previousRoutes.map((route) => {
    return (
      <span key={route.path}>
        <a
          href={route.path}
          className="underline font-semibold"
        >{route.name}</a><span className="mx-2"> > </span>
      </span>
    );
  });

  return (
    <>
      <nav className="flex m-2">
      {nav}
      <span>{currentRoute.name}</span>
      </nav>
    </>
  );
}