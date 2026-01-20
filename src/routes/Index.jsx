import React, { Component } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Authmiddleware from "./Route";
import LazyLoadRoutes from "./LazyLoadRoutes";
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import {
    LayoutDashboard,
    Layers,
    User,
    Radar,
    HouseWifi,
    ChartColumnIncreasing,
    Settings,
    Info,
    LifeBuoy
} from "lucide-react";

import {
    mdiViewDashboardOutline,
    mdiLayersTripleOutline,
    mdiAccountOutline,
    mdiHomeThermometerOutline,
    mdiAccessPointNetwork,
    mdiChartBoxOutline,
    mdiCogOutline,
    mdiFaceAgent,
    mdiInformationOutline,
} from '@mdi/js';

// Set all Menu 
export const appMenuStructure = [
    {
        path: "/plantya/dashboard",
        component: LazyLoadRoutes(() => import("../pages/app001/Dashboard")),
        text: "Dashboard",
        icon: mdiViewDashboardOutline,
        section: "main"
    },
    {
        text: "Master Data",
        icon: mdiLayersTripleOutline,
        section: "main",
        sub: [
            {
                text: "Master User",
                path: "/plantya/app002/master-user",
                component: LazyLoadRoutes(() => import("../pages/app002/MasterUser")),
                icon: mdiAccountOutline
            },
            {
                text: "Master Cluster",
                path: "/plantya/app003/master-cluster",
                component: LazyLoadRoutes(() => import("../pages/app003/MasterCluster")),
                icon: mdiHomeThermometerOutline
            },
            {
                text: "Master Device",
                path: "/plantya/app004/master-device",
                component: LazyLoadRoutes(() => import("../pages/app004/MasterDevice")),
                icon: mdiAccessPointNetwork
            },
        ],
    },
    {
        text: "Reports",
        icon: mdiChartBoxOutline,
        section: "main",
        sub: [
            {
                text: "Table",
                path: "/plantya/testing",
                component: "",
                icon: mdiChartBoxOutline
            },
            {
                text: "Graph",
                path: "/plantya/master-data/graph",
                component: "",
                icon: mdiChartBoxOutline
            },
        ],
    },
    {
        path: "/plantya/settings",
        component: "",
        text: "Settings",
        icon: mdiCogOutline,
        section: "main"
    },
    {
        path: "/plantya/support",
        component: "/test",
        text: "Support",
        icon: mdiFaceAgent,
        section: "footer"
    },
    {
        path: "/plantya/about",
        component: "",
        text: "About",
        icon: mdiInformationOutline,
        section: "footer"
    },
];

// Function Route Menu
const createRoute = (items) => {
    let routes = []
    items.forEach(item => {
        if (item.path && item.component) {
            routes.push({
                path: item.path,
                component: item.component
            })
        }
        if (item.sub) {
            routes = routes.concat(createRoute(item.sub))
        }
    })
    return routes
}

const AuthProtectedRoutes = createRoute(appMenuStructure)
const PublicRoutes = [
    { path: "/plantya/login", component: <Login /> },
    { path: "/plantya/register", component: <Register /> },
    { path: "/plantya/logout", component: <Logout /> }
]

export { AuthProtectedRoutes, PublicRoutes }