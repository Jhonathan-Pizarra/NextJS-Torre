/**
 * Created by Jhonathan
 */

const publicRoutes = {
    HOME: "/",
    LOGIN: "/login",
    //REGISTER: "/registro",
    CANDIDATES: "/candidates",
    // USERS: "/usuarios",
    // USERS_ID: `/usuario/:id`,
    ABOUT: "/about",
};

const privateRoutes = {
    // FESTIVAL_ID: "/festival/:id",
};

const Routes = {
    ...publicRoutes,
    ...privateRoutes,
};
export default Routes;