import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("./App.tsx"),
  // route("about", "./about.tsx"),

  // layout("./auth/layout.tsx", [
  //   route("login", "./auth/login.tsx"),
  //   route("register", "./auth/register.tsx"),
  // ]),

  // ...prefix("concerts", [
  //   index("./concerts/home.tsx"),
  //   route(":city", "./concerts/city.tsx"),
  //   route(":city/:id", "./concerts/show.tsx"),
  //   route("trending", "./concerts/trending.tsx"),
  // ]),
] satisfies RouteConfig;
